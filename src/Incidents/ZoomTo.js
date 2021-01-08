import MotorCortex from '@kissmybutton/motorcortex';
import AnimeDef from "@kissmybutton/motorcortex-anime";
const AnimePlugin = MotorCortex.loadPlugin(AnimeDef);

/**
 * The attrs that the Incident accepts are:
 * - zoom: anything from 0 to N
 * - center: {x, y} in pixels
 * - duration: the duration of the move
 * - easing: the easing of the move
 * - dims: {width, height}
 * - viewport: {width, height}
 */
export default class MyCombo extends MotorCortex.Combo{
    get incidents(){
        let viewport = this.attrs.viewport;
        if(!this.attrs.viewport){
            viewport = this.attrs.dims;
        }

        // the dimensions of our object / element having applied the target zoom
        const objectCurrentDims = {
            width: this.attrs.dims.width * this.attrs.zoom,
            height: this.attrs.dims.height * this.attrs.zoom
        };
        // the target point from the top-left corner of the object, having applied the target zoom
        const targetCenter = {
            x: this.attrs.zoom * this.attrs.center.x,
            y: this.attrs.zoom * this.attrs.center.y
        };
        const move = {
            x: viewport.width/2 - targetCenter.x,
            y: viewport.height/2 - targetCenter.y
        }

        const attrs = {
            animatedAttrs: {
                transform: {
                    scaleX: this.attrs.zoom,
                    scaleY: this.attrs.zoom,
                    translateX: `${move.x}px`,
                    translateY: `${move.y}px`
                }
            }
        };

        const props = {
            duration: this.attrs.duration,
            easing: this.attrs.easing
        }

        return [{
            incidentClass: AnimePlugin.Anime,
            attrs,
            props,
            position: 0
        }];
    }
}