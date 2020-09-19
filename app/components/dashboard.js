import Component from '@glimmer/component';
import { action } from '@ember/object';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';

export default class DashboardComponent extends Component {
    @action
    addDashboard(element) {
        const a = new Uppy({
            id: 'uppy',
            debug: true
            })
            .use(Dashboard, {
            target: '#uppyDashboard',
            inline: true,
            width: 400
            })
        }
}
