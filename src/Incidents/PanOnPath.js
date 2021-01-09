/*
M 232.893 552.922 C -14.921 312.7 959.84 -88.108 1251.138 194.266 C 1929.119 182.67 1554.691 582.533 1351.294 586.012 C 898.989 540.454 1202.984 713.367 1347.306 727.904
*/
import MotorCortex from '@kissmybutton/motorcortex';
import ZoomTo from './ZoomTo';

/**
 * The attrs that this Incident expect are almost identical with its "brother's"
 * ZoomTo:
 * {
 *  animatedAttrs:{
 *      position: {
 *          path,
 *          zoom
 *      }
 *  },
 *  transition: 0,
 *  from: 0,
 *  to: 1
 * }
 * 
 * path must be a valid svg path that will be put on the "d" attribute of the path element
 * that will be created out of it and which will be used as our guide for the 
 * move. 
 * A difference between this Incident and the simple ZoomTo Incident is that 
 * ZoomTo optionally takes initial values, meaning that it will just move from
 * where the camera is to the target value. FocusAlongPath will start from the 
 * first point of the provided path, no matter where the camera was. This might
 * introduce an anwanted jump effect. 
 * The "transition" attribute, provided outside the animatedAttrs allows us to optionally 
 * define a transition duration from the current point to the start of the path. This is
 * by default 0. Keep in mind that the duration of the transition will be substracted from
 * the move along path. For example if the user provides props.duration = 2000 and 
 * attrs.transition = 100, then the move along the path will only last 1900 milliseconds
 * and the total duration of the Incident will still be 2000. Zoom remains tha same during
 * the transition and only starts animating when the movement enters the path.
 * The "from" and "to" attributes (also outside the animatedAttrs) allows the developer
 * to define if they want the movement to start from a specific portion (0 to 1) of the
 * path or to end on a specific portion of it (again 0 to 1). These two attributes are
 * optional too with default values from:0 and to:1.
 */
export default class FocusAlongPath extends ZoomTo{
    onInitialise(){
        // create a data repository that will hold usefull info of our Incident
        const duration = this.duration;
        const path = document.createElement('path');
        
        this.data = {
            path,
            finalPoint: null,
            startPoint: null,
            zoom: this.targetValue.zoom,
            pathLength: path.getTotalLength(),
            startFrom: !this.attrs.from ? 0 : this.attrs.from,
            endTo: !this.attrs.to ? 1 : this.attrs.to,
            transitionDuration: !this.attrs.transition ? 0 : this.attrs.transition,
            get alongPathDuration() { return duration - this.transitionDuration; }
        };
        this.data.finalPoint = path.getPointAtLength(data.endTo);
        this.data.startPoint = path.getPointAtLength(data.startFrom);

        // then set the final values of the Incident in terms of x, y, zoom so the 
        // following Incidents can use it
        this.targetValue.x = this.data.finalPoint.x;
        this.targetValue.y = this.data.finalPoint.y;
    }

    onGetContext(){
        this.progressMethod = this.adaptor.createPathProgressFunction(this.data, this.initialValue);
    }
}