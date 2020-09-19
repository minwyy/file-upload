import Controller from '@ember/controller';

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class IndexController extends Controller {

  @tracked finalSchedule;

  @action getSchedule(schedule){
    debugger;
    this.finalSchedule = schedule;

  }

  /*
  * This takes the schedule pieces sent to 'finalSchedule' and makes a REST call to create
  * a schedule in the microservice.
  */
  @action async sendSchedule() {
    debugger;
    // THIS PAYLOAD NEEDS TO MATCH POST API.
    // I expect his.finalSchedule will need to be broken into it's pieces
    // to match the required payload.
    const payload =
    {
      schedule: this.finalSchedule,

    };
    // THIS URL NEEDS TO MATCH YOUR TEST URL FOR POST
    const url = "pathToSpringBootPost";

    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        body: payload
      });

    let json = await response.json();
    debugger;
    return;
  }

}

