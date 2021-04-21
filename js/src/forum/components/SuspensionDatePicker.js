import Component from 'flarum/Component';
import flatpickr from 'flatpickr';

export default class SuspensionDatePicker extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.until = new Date(this.attrs.until());
  }

  oncreate() {
    flatpickr('.flatpickr-input', {
      enableTime: true,
      minDate: 'today',
      dateFormat: 'Y-m-d H:i',
      defaultDate: new Date()
    });
    $('.flatpickr-time').height('40px');
  }

  view() {
    return (
      <label className="label">{app.translator.trans('flarum-suspend.forum.datepicker.until')}
        <div className="Form-group">
          <input style="opacity: 1; color: inherit" required="required" className="FormControl flatpickr-input" data-input
                 value={this.until}/>
        </div>
      </label>
    )
  }
}
