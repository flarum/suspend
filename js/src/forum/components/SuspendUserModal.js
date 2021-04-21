import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

import Stream from 'flarum/utils/Stream';
import withAttr from 'flarum/utils/withAttr';
import ItemList from 'flarum/utils/ItemList';

import SuspensionDatePicker from './SuspensionDatePicker';

export default class SuspendUserModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    let until = this.attrs.user.suspendedUntil();
    let reason = this.attrs.user.suspendReason();
    let message = this.attrs.user.suspendMessage();
    let status = null;

    if (new Date() > until) until = null;

    if (until) {
      if (until.getFullYear() === 9999) status = 'indefinitely';
      else status = 'limited';
    }
    console.log(until);

    this.status = Stream(status);
    this.reason = Stream(reason);
    this.message = Stream(message);
    this.until = Stream(until);

    // let remaining = -dayjs().diff(until, 'minute');
    // console.log(remaining);
    // let days = Math.floor((remaining / 60) / 24);
    // let hours = Math.floor(
    //   days > 0 ?
    //     Math.floor(24 - ((((remaining / 60).toFixed(0) - (remaining / 60)) * 60).toFixed(0) / 60)) :
    //     Math.floor((remaining / 60))
    // );
    // let minutes = Math.floor(60 - (((remaining / 60).toFixed(0) - (remaining / 60)) * 60).toFixed(0));
    // console.log(minutes);
    // console.log(hours);
    // console.log(days);
    // this.daysRemaining = Stream(status === 'limited' && days);
    // this.hoursRemaining = Stream(status === 'limited' && hours);
    // this.minutesRemaining = Stream(status === 'limited' && minutes);
  }

  className() {
    return 'SuspendUserModal Modal--medium';
  }

  title() {
    return app.translator.trans('flarum-suspend.forum.suspend_user.title', {user: this.attrs.user});
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('flarum-suspend.forum.suspend_user.status_heading')}</label>
            <div>
              {this.formItems().toArray()}
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

  formItems() {
    const items = new ItemList();

    items.add(
      'not-suspended',
      <label className="checkbox">
        <input type="radio" name="status" checked={!this.status()} value="" onclick={withAttr('value', this.status)}/>
        {app.translator.trans('flarum-suspend.forum.suspend_user.not_suspended_label')}
      </label>,
      100
    );

    items.add(
      'indefinitely',
      <label className="checkbox">
        <input type="radio" name="status" checked={this.status() === 'indefinitely'} value='indefinitely'
               onclick={withAttr('value', this.status)}/>
        {app.translator.trans('flarum-suspend.forum.suspend_user.indefinitely_label')}
      </label>,
      90
    );

    items.add('date', <SuspensionDatePicker until={this.until}/>)

    items.add(
      'reason',
      <label>
        {app.translator.trans('flarum-suspend.forum.suspend_user.reason')}
        <textarea className="FormControl" bidi={this.reason} placeholder="optional" rows="2"/>
      </label>,
      70
    );

    items.add(
      'message',
      <label>
        {app.translator.trans('flarum-suspend.forum.suspend_user.display_message')}
        <textarea className="FormControl" bidi={this.message} placeholder="optional" rows="2"/>
      </label>,
      60
    );

    return items;
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    let suspendedUntil = null;

    switch (this.status()) {
      case 'indefinitely':
        suspendedUntil = new Date('2038-01-01');
        break;

      case 'limited':
        suspendedUntil = dayjs().add(this.daysRemaining(), 'days').add(this.hoursRemaining(), 'hours').add(this.minutesRemaining(), 'minutes').toDate();
        break;

      default:
      // no default
    }

    this.attrs.user.save({
      suspendedUntil: suspendedUntil,
      suspendReason: this.reason(),
      suspendMessage: this.message()
    }).then(
      () => this.hide(),
      this.loaded.bind(this)
    );
  }
}
