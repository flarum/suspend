import app from 'flarum/forum/app';
import type Notification from 'flarum/forum/components/Notification';

import UserSuspendedNotification from './components/UserSuspendedNotification';
import UserUnsuspendedNotification from './components/UserUnsuspendedNotification';

import { extendUserPrototype } from './extendUserPrototype';
import { addSuspendedBadge } from './addSuspendedBadge';
import { addSuspendControl } from './addSuspendControl';

app.initializers.add('flarum-suspend', () => {
  (app.notificationComponents as Record<string, { new (): Notification }>).userSuspended = UserSuspendedNotification;
  (app.notificationComponents as Record<string, { new (): Notification }>).userUnsuspended = UserUnsuspendedNotification;

  extendUserPrototype();

  addSuspendedBadge();
  addSuspendControl();
});
