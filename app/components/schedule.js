import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ScheduleComponent extends Component {

  monthOptions = [
    {name: 'January', value: 0},
    {name: 'February', value: 1},
    {name: 'March', value: 2},
    {name: 'April', value: 3}, ]
  months = [];

  @action showSchedule() {
    debugger;
    const schedule = {
      months: this.months,
    }
    this.args.getScheduleAction(schedule);
  }
}
