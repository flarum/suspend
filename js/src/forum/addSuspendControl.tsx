import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserControls from 'flarum/forum/utils/UserControls';
import Button from 'flarum/common/components/Button';
import type User from 'flarum/common/models/User';

import SuspendUserModal from './components/SuspendUserModal';
import ItemList from 'flarum/common/utils/ItemList';

/**
 * Adds the "Suspend" option to the list of UserControls.
 */
export function addSuspendControl() {
  extend(UserControls, 'moderationControls', (items: ItemList, user: User) => {
    if (user.canSuspend()) {
      items.add(
        'suspend',
        <Button icon="fas fa-ban" onclick={() => app.modal.show(SuspendUserModal, { user })}>
          {app.translator.trans('flarum-suspend.forum.user_controls.suspend_button')}
        </Button>
      );
    }
  });
}
