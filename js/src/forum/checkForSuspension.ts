import app from 'flarum/forum/app';
import SuspensionInfoModal from './components/SuspensionInfoModal';

export default function () {
  return new Promise(() => {
    setTimeout(() => {
      if (app.session.user) {
        const message = app.session.user.suspendMessage();
        const until = app.session.user.suspendedUntil();
        if (message) {
          app.modal.show(SuspensionInfoModal, { message, until });
        }
      }
    }, 1000);
  });
}
