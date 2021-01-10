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
    animatedAttrs: {
        position: {
            x: 700,
            y: 342,
            zoom: 0.7
        }
    }
}, {
    selector: '.img',
    duration: 2000,
    easing: 'easeOutSine'
});

const zoomTo2 = new MyPlugin.ZoomTo({
    animatedAttrs: {
        position: {
            x: 1280,
            y: 150,
            zoom: 1.2
        }
    }
}, {
    selector: '.img',
    duration: 4000,
    easing: 'easeInOutSine'
});

const zoomTo3 = new MyPlugin.ZoomTo({
    animatedAttrs: {
        position: {
            x: 1375,
            y: 460,
            zoom: 1
        }
    }
}, {
    selector: '.img',
    duration: 3000,
    easing: 'easeInOutSine'
});

const pop1 = new MyPlugin.PanOnPath({
    transition: 1000,
    animatedAttrs: {
        position: {
            path: 'M 232.893 552.922 C -14.921 312.7 959.84 -88.108 1251.138 194.266 C 1929.119 182.67 1554.691 582.533 1351.294 586.012 C 898.989 540.454 1202.984 713.367 1347.306 727.904',
            zoom: 0.5
        }
    }
}, {
    duration: 3000,
    selector: '.img'
})

clip.addIncident(zoomTo1, 0);
clip.addIncident(zoomTo2, 2000);
clip.addIncident(zoomTo3, 6000);
clip.addIncident(pop1, 9000);
const player = new Player({clip});