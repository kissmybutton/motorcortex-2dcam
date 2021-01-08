import MotorCortex from '@kissmybutton/motorcortex';
import AdaptorClass from '../utils/Adaptor';
const Adaptor = new AdaptorClass();

/**
 * Thus, here you'll find:
 * the following properties:
 * - this.element: provides a reference to the specific element of the MonoIncident
 * - this.attributeKey: the key of the animatedAttr of the MonoIncident
 * - this.targetValue: the final value of the animatedAttr
 * and the following methods:
 * - onGetContext
 * - getScratchValue
 * - onProgress
 * which are analysed more inline
 *
 **/
export default class MyEffect extends MotorCortex.Effect{
    /**
    * the scratch value of the Incident should return back the triplette 
    * x, y, zoom
    * We consider as the viewport the parent node of our element and we calculate
    * its initial position taking in consideration the relative position of our 
    * element into its parent node. The initial zoom is calculated out of the 
    * scaleX value of our element
    **/
    getScratchValue(){
        return Adaptor.calcXYZoom(this.element);
    }
    
    /**
    * The moment the Effect gets applied as MonoIncident to the specific
    * element and for the specific animatedAttr.
    * You can use this method to initialise anything you need to initialise
    * in order to use it on the onProgress method
    **/
    onGetContext(){
        this.element.style.transformOrigin = "top left";

        const idlePosition = Adaptor.getIdlePosition(this.element);
        const viewportCenter = Adaptor.getViewPortCenter(this.element);

        // we calculate the initial and the target translateX and translateY and
        // of course the initial and target scale
        const target = this.targetValue;
        const start = this.initialValue;
        // the target point from the top-left corner of the object, having applied the target zoom
        const targetCenter = {
            x: this.attrs.zoom * this.attrs.center.x,
            y: this.attrs.zoom * this.attrs.center.y
        };
        const move = {
            x: viewport.width/2 - targetCenter.x,
            y: viewport.height/2 - targetCenter.y
        }
    }

    /**
    * 
    **/
    onProgress(fraction, millisecond){

    }
}