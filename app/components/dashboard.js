import Component from '@glimmer/component';
import { action } from '@ember/object';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Tus from '@uppy/tus';

export default class DashboardComponent extends Component {
    @action
    addDashboard(element) {
        const uppy = new Uppy({
            debug: true,
            autoProceed: false,
            restrictions: {
              maxFileSize: 100000000000,
              maxNumberOfFiles: 5,
              minNumberOfFiles: 1,
              allowedFileTypes: ['image/*', 'video/*']
            }
        })
        .use(Dashboard, {
            trigger: '.UppyModalOpenerBtn',
            inline: true,
            target: '#uppyDashboard',
            replaceTargetContent: true,
            showProgressDetails: true,
            note: 'Only image and video allowed, up to 100 GB',
            height: 470,
            metaFields: [
              { id: 'name', name: 'Name', placeholder: 'file name' },
              { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
            ],
            browserBackButtonClose: true
        })

        .use(Tus, { endpoint: 'https://master.tus.io/files/' })
          
          uppy.on('complete', result => {
            console.log('successful files:', result.successful)
            console.log('failed files:', result.failed)
        })
    }
}
