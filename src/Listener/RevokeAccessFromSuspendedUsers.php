<?php

/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Flarum\Suspend\Listener;

use Carbon\Carbon;
use Flarum\Event\GetPermission;
use Flarum\Event\ScopeModelVisibility;
use Flarum\User\Guest;
use Illuminate\Contracts\Events\Dispatcher;

class RevokeAccessFromSuspendedUsers
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetPermission::class, [$this, 'revokeAccess']);
        $events->listen(ScopeModelVisibility::class, [$this, 'revokeAccess']);
    }

    public function revokeAccess($event)
    {
        $suspendUntil = $event->actor->suspend_until;

        if ($suspendUntil && $suspendUntil->gt(Carbon::now())) {
            $event->actor = new Guest;
        }
    }
}
