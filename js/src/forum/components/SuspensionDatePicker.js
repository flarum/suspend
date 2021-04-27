import Component from 'flarum/Component';
import flatpickr from 'flatpickr';

export default class SuspensionDatePicker extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.untilDateUnformatted = this.attrs.untilDate() === null ? new Date() : new Date(this.attrs.untilDate());
    this.untilDate = this.formatDate(this.untilDateUnformatted);
    this.updateDate = this.attrs.updateDate;
  }

  oncreate() {
    flatpickr('.flatpickr-input', {
      enableTime: true,
      minDate: 'today',
      dateFormat: 'l, d F, Y h:i K',
      defaultDate: this.untilDateUnformatted,
      onChange: (selectedDates, dateStr, instance) => {this.updateDate(dateStr)}
    });
    $('.flatpickr-time').height('40px');
  }

  view() {
    return (
      <div className="Form-group">
        <input style="opacity: 1; color: inherit" required="required" className="FormControl flatpickr-input" data-input
               value={this.untilDate} />
      </div>
    )
  }

  formatDate(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear() + ' ' + strTime;
  }
}
