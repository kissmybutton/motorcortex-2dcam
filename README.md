# motorcortex-2dcam
motorcortex-2dcam acts exaclty as a 2d camera that can focus and zoom on
any given point of any element.
You can move your camera around, zoom and unzoom, follow paths, all
via its easy to use Incidents.

## Installation

```bash
$ npm install --save @kissmybutton/motorcortex-2dcam
# OR
$ yarn add @kissmybutton/motorcortex-2dcam
```

## Importing and loading

```javascript
import MotorCortex from "@kissmybutton/motorcortex";
import TDCAMDef from "@kissmybutton/motorcortex-2dcam";
const TDCAM = MotorCortex.loadPlugin(TDCAMDef);
```

## API
The Plugin exposes two Incidents:
* ZoomTo
* PanOnPath

### Clip
The Clip is used to create a new video clip and you can pass to it all of the core video information such as the source and the size:
```javascript
import MotorCortex from "@kissmybutton/motorcortex";
import MCVideo from "@kissmybutton/motorcortex-video";
const VideoPlugin = MotorCortex.loadPlugin(MCVideo);

const VideoClip = new VideoPlugin.Clip({
    sources: [
        'http://path/to/the/video/file.mp4',
        './path/to/the/video/file.ogg' // alternative source for browser compatibility issues
    ],
    width: 640,
    height: 360
}, {
    selector: '.your-selector' // or host: your-host
});
```

As shown on the example the supported attributes that the "Clip" Incident accepts are:
* sources: an array of sources to be used for your video. Is expected to be an array as you might need to pass more than one sources (e.g. an mp4 and an ogg)
* width: (optional / defaults to 640). The desired width of the video in pixels. You only need to define it by an integer
* height (optional / defaults to 360). The desired height of the video in pixels. You only need to define it by an integer
* startFrom (optional / defaluts to 0). If passed the video will be loaded directly with start on the specified millisecond

### Playback
The Playback Incident is used to define the execution of the video. The only thing to set is the duration.
```javascript
import MotorCortex from "@kissmybutton/motorcortex";
import MCVideo from "@kissmybutton/motorcortex-video";
const VideoPlugin = MotorCortex.loadPlugin(MCVideo);

const VideoClip = new VideoPlugin.Clip({
    sources: [
        'http://path/to/the/video/file.mp4',
        './path/to/the/video/file.mp4'
    ],
    width: 640,
    height: 360,
    startFrom: 20000
}, {
    selector: '.your-selector' // or host: your-host
});

const Playback = new VideoPlugin.Playback({
    selector: "!#video", // that's mandatory, it should always have the value "!#video" and it targets the video of the VideoPlugin.Clip 
    duration: 20000 // the duration of the playback in milliseconds
});

VideoClip.addIncident(Playback, 0);
```

### Effects
The VideoEffect incident allows the user to apply effects on the video.
The supported effects are:
* blur: from 0 to 1, default value: 0
* brightness: from 0 to 1, default: 1
* contrast: minimum value: 0, default: 1
* grayscale: from 0 to 1, default: 1
* hue-rotate: expressed in degrees (0-360) and with default value 0
* invert: from 0 to 1, default: 0
* opacity: from 0 to 1, default: 1
* saturate: minimum value: 0, default: 1
* sepia: from 0 to 1, default: 0
and they are all exposed as members of the composite attribute "filter"

```javascript
import MotorCortex from "@kissmybutton/motorcortex";
import MCVideo from "@kissmybutton/motorcortex-video";
const VideoPlugin = MotorCortex.loadPlugin(MCVideo);

const VideoClip = new VideoPlugin.Clip({
    sources: [
        'http://path/to/the/video/file.mp4',
        './path/to/the/video/file.mp4'
    ],
    width: 640,
    height: 360,
    startFrom: 20000
}, {
    selector: '.your-selector' // or host: your-host
});

const Playback = new VideoPlugin.Playback({
    selector: "!#video", // that's mandatory, it should always have the value "!#video" and it targets the video of the VideoPlugin.Clip 
    duration: 20000 // the duration of the playback in milliseconds
});

const Effect = new VideoPlugin.VideoEffect({
    animatedAttrs: {
        filter: {
            blur: 5,
            brightness: 0.2,
            contrast: 0.9,
            grayscale: 0.5,
            'hue-rotate': 180,
            invert: 0.8,
            opacity: 0.5,
            saturate: 0.2,
            sepia: 0.9
        }
    }
}, {
    selector: "!#video", // that's mandatory, it should always have the value "!#video" and it targets the video of the VideoPlugin.Clip 
    duration: 4000
});

VideoClip.addIncident(Playback, 0);
VideoClip.addIncident(Effect, 1000);
```

[Demo:](https://kissmybutton.github.io/motorcortex-video/demo/)