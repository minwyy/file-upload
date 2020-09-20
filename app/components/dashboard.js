import Component from '@glimmer/component';
import { action } from '@ember/object';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Tus from '@uppy/tus';
import GoldenRetriever from '@uppy/golden-retriever';

export default class DashboardComponent extends Component {
    @action
    addDashboard(element) {
        const uppy = new Uppy({
            debug: true,
            autoProceed: false,
            restrictions: {
              maxFileSize: 10000000000,
              maxNumberOfFiles: 5,
              minNumberOfFiles: 1,
              allowedFileTypes: ['image/*', 'video/*', '.mkv']
            }
        })
        .use(Dashboard, {
            trigger: '.UppyModalOpenerBtn',
            inline: true,
            target: '#uppyDashboard',
            replaceTargetContent: true,
            showProgressDetails: true,
            note: 'Only image and video, up to 10 GB',
            height: 470,
            metaFields: [
              { id: 'name', name: 'Name', placeholder: 'file name' },
              { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
            ],
            browserBackButtonClose: true
        })

        .use(Tus, { 
            endpoint: 'http://localhost:8080/upload',
            resume: true
        })

        .use(GoldenRetriever, {serviceWorker: true})
          
        uppy.on('complete', result => {
            console.log('successful files:', result.successful)
            console.log('failed files:', result.failed)
        })
    }
}
