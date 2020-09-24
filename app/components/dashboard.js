import Component from '@glimmer/component';
import { action } from '@ember/object';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import OneDrive from '@uppy/onedrive';
import Webcam from '@uppy/webcam';
import Tus from '@uppy/tus';
// import GoldenRetriever from '@uppy/golden-retriever';

export default class DashboardComponent extends Component {
    // add action for 'did-insert' modifier in hbs templates which is used to bind uppy package to the element after being rendered into the DOM
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
        // use dashboard plugin
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
        // use Tus plugin for file upload
        .use(Tus, { 
            endpoint: 'http://localhost:8080/upload',
            resume: true,
            chunkSize: 5000000000
        })
        // install GoldenRetriever plugins (Service Worker not enabled as it cannot survive browser crashes)
        // .use(GoldenRetriever, {serviceWorker: false})
        // use OneDrive plugin
        .use(OneDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
        // use webcam plugin
        .use(Webcam, { target: Dashboard })

        uppy.on('complete', result => {
            console.log('successful files:', result.successful)
            console.log('failed files:', result.failed)
        })
    }
}
