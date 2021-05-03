<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Suspend\Listener;

use DateTime;
use Flarum\Formatter\Formatter;
use Flarum\Post\Post;
use Flarum\Suspend\Event\Suspended;
use Flarum\Suspend\Event\Unsuspended;
use Flarum\Suspend\SuspendValidator;
use Flarum\User\Event\Saving;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class SaveSuspensionToDatabase
{
    /**
     * Validator for limited suspension.
     *
     * @var SuspendValidator
     */
    protected $validator;

    /**
     * @var Dispatcher
     */
    protected $events;

    /**
     * @var Formatter
     */
    protected $formatter;

    /**
     * @param SuspendValidator $validator
     * @param Dispatcher $events
     */
    public function __construct(SuspendValidator $validator, Dispatcher $events, Formatter $formatter)
    {
        $this->validator = $validator;
        $this->events = $events;
        $this->formatter = $formatter;
    }

    public function handle(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (array_key_exists('suspendedUntil', $attributes)) {
            $this->validator->assertValid($attributes);

            $user = $event->user;
            $actor = $event->actor;

            $actor->assertCan('suspend', $user);

            $user->suspended_until = null;

            if ($attributes['suspendedUntil']) {
                $user->suspended_until = new DateTime($attributes['suspendedUntil']);
                $user->suspend_reason = empty($attributes['suspendReason']) ?
                    $this->formatter->parse('', new Post()) : $this->formatter->parse($attributes['suspendReason']);
                $user->suspend_message = empty($attributes['suspendMessage']) ?
                    $this->formatter->parse('', new Post()) : $this->formatter->parse($attributes['suspendMessage']);
            } else {
                $user->suspend_reason = null;
                $user->suspend_message = null;
            }

            if ($user->isDirty(['suspended_until', 'suspend_reason', 'suspend_message'])) {
                $this->events->dispatch(
                    $user->suspended_until === null ?
                        new Unsuspended($user, $actor) :
                        new Suspended($user, $actor)
                );
            }
        }
    }
}
