/*
M 232.893 552.922 C -14.921 312.7 959.84 -88.108 1251.138 194.266 C 1929.119 182.67 1554.691 582.533 1351.294 586.012 C 898.989 540.454 1202.984 713.367 1347.306 727.904
*/
import MotorCortex from '@kissmybutton/motorcortex';

export default class PanToPath extends MotorCortex.Effect{
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