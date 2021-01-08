import MotorCortex from '@kissmybutton/motorcortex';
import MyPluginDefinition from "../dist/bundle.umd";
const MyPlugin = MotorCortex.loadPlugin(MyPluginDefinition);

import Player from "@kissmybutton/motorcortex-player";


const clip = new MotorCortex.HTMLClip({
    html: ()=>
        <div class="container">
            <div class="img">
                <img src="https://s23527.pcdn.co/wp-content/uploads/2017/09/bounce_umbrella.jpg.optimal.jpg" />
            </div>
        </div>,
    css: `
        .container{
            width: 640px;
            height: 360px;
            background: black;
        }
        .img{
            width: 1200px;
            height: 550px;
            transform: scale(0.34);
            transform-origin: top left;
        }
    `,
    host: document.getElementById('clip'),
    containerParams: {
        width: '640px',
        height: '360px'
    }
});

const zoomTo1 = new MyPlugin.ZoomTo({
    dims: {
        width: 1920,
        height: 1080
    },
    viewport: {
        width: 640,
        height: 360
    },
    center: {
        x: 700,
        y: 342
    },
    zoom: 0.7,
    duration: 2000,
    easing: 'easeOutSine'
}, {
    selector: '.img'
});

const zoomTo2 = new MyPlugin.ZoomTo({
    dims: {
        width: 1920,
        height: 1080
    },
    viewport: {
        width: 640,
        height: 360
    },
    center: {
        x: 1280,
        y: 150
    },
    zoom: 1.2,
    duration: 4000,
    easing: 'easeInOutSine'
}, {
    selector: '.img'
});

const zoomTo3 = new MyPlugin.ZoomTo({
    dims: {
        width: 1920,
        height: 1080
    },
    viewport: {
        width: 640,
        height: 360
    },
    center: {
        x: 1375,
        y: 460
    },
    zoom: 1,
    duration: 3000,
    easing: 'easeInOutSine'
}, {
    selector: '.img'
});



clip.addIncident(zoomTo1, 0);
clip.addIncident(zoomTo2, 2000);
clip.addIncident(zoomTo3, 6000);
console.log(clip);
const player = new Player({clip});