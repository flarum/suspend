import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';

/**
 * Add Suspend helpers to the User model.
 */
export function extendUserPrototype() {
  User.prototype.canSuspend = Model.attribute('canSuspend');
  User.prototype.suspendedUntil = Model.attribute('suspendedUntil', Model.transformDate);
}
