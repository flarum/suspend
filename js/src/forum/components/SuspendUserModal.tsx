import app from 'flarum/forum/app';
import type { Vnode } from 'mithril';

import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

import Stream from 'flarum/common/utils/Stream';
import withAttr from 'flarum/common/utils/withAttr';

import { calculateDaysRemaining } from '../helpers/calculateDaysRemaining';

export default class SuspendUserModal extends Modal {
  // Workaround for missing Stream typings
  status!: (e?: string) => string;
  daysRemaining!: (e?: number) => number;

  oninit(vnode: Vnode) {
    super.oninit(vnode);

    let until = this.attrs.user.suspendedUntil();
    let status = null;

    if (new Date() > until) until = null;

    if (until) {
      if (until.getFullYear() === 9999) status = 'indefinitely';
      else status = 'limited';
    }

    this.status = Stream(status);
    this.daysRemaining = Stream(status === 'limited' && calculateDaysRemaining(until));
  }

  className() {
    return 'SuspendUserModal Modal--small';
  }

  title() {
    return app.translator.trans('flarum-suspend.forum.suspend_user.title', { user: this.attrs.user });
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('flarum-suspend.forum.suspend_user.status_heading')}</label>
            <div>
              <label className="checkbox">
                <input type="radio" name="status" checked={!this.status!()} value="" onclick={withAttr('value', this.status)} />
                {app.translator.trans('flarum-suspend.forum.suspend_user.not_suspended_label')}
              </label>

              <label className="checkbox">
                <input
                  type="radio"
                  name="status"
                  checked={this.status!() === 'indefinitely'}
                  value="indefinitely"
                  onclick={withAttr('value', this.status!)}
                />
                {app.translator.trans('flarum-suspend.forum.suspend_user.indefinitely_label')}
              </label>

              <label className="checkbox SuspendUserModal-days">
                <input
                  type="radio"
                  name="status"
                  checked={this.status!() === 'limited'}
                  value="limited"
                  onclick={(e: Event & { redraw: boolean }) => {
                    this.status!((e.currentTarget as HTMLInputElement).value);
                    m.redraw.sync();
                    this.$('.SuspendUserModal-days-input input').trigger('select');
                    e.redraw = false;
                  }}
                />
                {app.translator.trans('flarum-suspend.forum.suspend_user.limited_time_label')}
                {this.status!() === 'limited' ? (
                  <div className="SuspendUserModal-days-input">
                    <input
                      type="number"
                      min="0"
                      value={this.daysRemaining!()}
                      oninput={withAttr('value', this.daysRemaining!)}
                      className="FormControl"
                    />
                    {app.translator.trans('flarum-suspend.forum.suspend_user.limited_time_days_text')}
                  </div>
                ) : (
                  ''
                )}
              </label>
            </div>
          </div>

          <div className="Form-group">
            <Button className="Button Button--primary" loading={this.loading} type="submit">
              {app.translator.trans('flarum-suspend.forum.suspend_user.submit_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e: Event) {
    e.preventDefault();

    this.loading = true;

    let suspendedUntil = null;
    switch (this.status!()) {
      case 'indefinitely':
        suspendedUntil = new Date('2038-01-01');
        break;

      case 'limited':
        suspendedUntil = dayjs().add(this.daysRemaining!(), 'days').toDate();
        break;

      default:
      // no default
    }

    this.attrs.user.save({ suspendedUntil }).then(() => this.hide(), this.loaded.bind(this));
  }
}
