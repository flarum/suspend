import _User from '../../../../../vendor/flarum/core/js/dist-typings/common/models/User';

/**
 * @inheritdoc
 */
export default class User extends _User {
  /**
   * Returns a Date object which represents when the user is suspended until.
   *
   * Returns `null` if the user is not suspended.
   *
   * @example
   * Date { "Wed Nov 23 2022 14:12:07 GMT+0000 (Greenwich Mean Time)" }
   * // Suspended until 23 Nov 2020
   *
   * @example
   * null
   * // Not suspended
   */
  suspendedUntil(): Date | null;

  /**
   * Returns whether the current session user has permission to suspend this User.
   */
  canSuspend(): boolean;
}
