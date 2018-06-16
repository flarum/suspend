<?php

/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Suspend\Access;
use Flarum\Suspend\Listener;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Assets('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->asset(__DIR__.'/less/forum.less'),

    (new Extend\Assets('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->asset(__DIR__.'/less/admin.less'),

    function (Dispatcher $events) {
        $events->subscribe(Listener\AddUserSuspendAttributes::class);
        $events->subscribe(Listener\RevokeAccessFromSuspendedUsers::class);
        $events->subscribe(Listener\SaveSuspensionToDatabase::class);

        $events->subscribe(Access\UserPolicy::class);
    }
];
