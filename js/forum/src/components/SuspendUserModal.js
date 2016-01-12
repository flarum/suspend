import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class SuspendUserModal extends Modal {
  init() {
    super.init();

    let until = this.props.user.suspendUntil();
    let status = null;

    if (new Date() > until) until = null;

    if (until) {
      if (until.getFullYear() === 9999) status = 'indefinitely';
      else status = 'limited';
    }

    this.status = m.prop(status);
    this.daysRemaining = m.prop(status === 'limited' && -moment().diff(until, 'days') + 1);
  }

  className() {
    return 'SuspendUserModal Modal--small';
  }

  title() {
    return app.translator.trans('flarum-suspend.forum.moderation_controls.suspend_title') + ' ' + this.props.user.username();
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('flarum-suspend.forum.status.suspend_status')}</label>
            <div>
              <label className="checkbox">
                <input type="radio" name="status" checked={!this.status()} onclick={m.withAttr('value', this.status)}/>
                {app.translator.trans('flarum-suspend.forum.status.not_suspended')}
              </label>

              <label className="checkbox">
                <input type="radio" name="status" checked={this.status() === 'indefinitely'} value='indefinitely' onclick={m.withAttr('value', this.status)}/>
                {app.translator.trans('flarum-suspend.forum.status.suspended_indefinitely')}
              </label>

              <label className="checkbox SuspendUserModal-days">
                <input type="radio" name="status" checked={this.status() === 'limited'} value='limited' onclick={e => {
                  this.status(e.target.value);
                  m.redraw(true);
                  this.$('.SuspendUserModal-days-input input').select();
                  m.redraw.strategy('none');
                }}/>
                {app.translator.trans('flarum-suspend.forum.status.suspended_for')}
                {this.status() === 'limited' ? (
                  <div className="SuspendUserModal-days-input">
                    <input type="number"
                      min="0"
                      value={this.daysRemaining()}
                      oninput={m.withAttr('value', this.daysRemaining)}
                      className="FormControl"/>
                    {app.translator.trans('flarum-suspend.forum.status.days')}
                  </div>
                ) : ''}
              </label>
            </div>
          </div>

          <div className="Form-group">
            <Button className="Button Button--primary" loading={this.loading} type="submit">
            {app.translator.trans('flarum-suspend.forum.moderation_controls.save_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    let suspendUntil = null;
    switch (this.status()) {
      case 'indefinitely':
        suspendUntil = new Date('9999-12-31');
        break;

      case 'limited':
        suspendUntil = moment().add(this.daysRemaining(), 'days').toDate();
        break;

      default:
        // no default
    }

    this.props.user.save({suspendUntil}).then(
      () => this.hide(),
      this.loaded.bind(this)
    );
  }
}
