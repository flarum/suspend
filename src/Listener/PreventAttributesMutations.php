<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Suspend\Listener;

use Flarum\User\Event\Saving;
use Flarum\User\Exception\PermissionDeniedException;

class PreventAttributesMutations
{
    public function handle(Saving $event)
    {
        if (! $event->user->suspended_until) {
            return;
        }

        if ($event->user->id === $event->actor->id) {
            throw new PermissionDeniedException;
        }
    }
}
