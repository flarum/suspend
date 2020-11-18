<?php

namespace Flarum\Suspend\Listener;

use Flarum\User\Event\Saving;
use Flarum\User\Exception\PermissionDeniedException;

class PreventAttributesMutations
{
    public function handle(Saving $event)
    {
        if (! $event->user->suspended_until) return;

        if ($event->user->id === $event->actor->id) {
            throw new PermissionDeniedException;
        }
    }
}
