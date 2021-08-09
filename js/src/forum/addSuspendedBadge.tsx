import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Badge from 'flarum/common/components/Badge';
import User from 'flarum/common/models/User';
import type ItemList from 'flarum/common/utils/ItemList';

export function addSuspendedBadge() {
  extend(User.prototype, 'badges', function (this: User, items: ItemList) {
    const until = this.suspendedUntil();

    if (until && new Date() < until) {
      items.add(
        'suspended',
        <Badge icon="fas fa-ban" type="suspended" label={app.translator.trans('flarum-suspend.forum.user_badge.suspended_tooltip')} />
      );
    }
  });
}
