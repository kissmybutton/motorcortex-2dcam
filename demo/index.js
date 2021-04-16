import MotorCortex from "@kissmybutton/motorcortex";
import Player from "@kissmybutton/motorcortex-player";

import MyPluginDefinition from "../dist/motorcortex-2dcam.umd";
const MyPlugin = MotorCortex.loadPlugin(MyPluginDefinition);

const rootClip = new MotorCortex.HTMLClip({
  html: `
    <div class="container">
      <div class="casi-container"></div>
    </div>`,
  css: `
    .container, .casi-container{
      width: 640px;
      height: 360px;
      background: black;
    }
  `,
  host: document.getElementById("clip"),
  containerParams: {
    width: "640px",
    height: "360px",
  },
});

const mypath = "M 1280 150 L 1380 464";
const clip = new MotorCortex.HTMLClip({
  html: `
    <div class="container">
      <div class="img">
        <img src="https://s23527.pcdn.co/wp-content/uploads/2017/09/bounce_umbrella.jpg.optimal.jpg" />
      </div>
    </div>`,
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
  selector: ".casi-container",
  containerParams: {
    width: "640px",
    height: "360px",
  },
});

rootClip.addIncident(clip, 0);

const zoomTo1 = new MyPlugin.ZoomTo(
  {
    animatedAttrs: {
      position: {
        x: 700,
        y: 342,
        zoom: 0.7,
      },
    },
  },
  {
    selector: ".img",
    duration: 2000,
    easing: "easeOutSine",
  }
);

const zoomTo2 = new MyPlugin.ZoomTo(
  {
    animatedAttrs: {
      position: {
        x: 1280,
        y: 150,
        zoom: 1.2,
      },
    },
  },
  {
    selector: ".img",
    duration: 4000,
    easing: "easeInOutSine",
  }
);

const pop1 = new MyPlugin.FollowPath(
  {
    animatedAttrs: {
      position: {
        path: mypath,
        zoom: 1,
      },
    },
  },
  {
    duration: 3000,
    selector: ".img",
    easing: "easeOutCubic",
  }
);

clip.addIncident(zoomTo1, 0);
clip.addIncident(zoomTo2, 2000);
clip.addIncident(pop1, 6000);

new Player({ clip: rootClip });
