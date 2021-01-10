import MotorCortex from '@kissmybutton/motorcortex';
import Adaptor from '../utils/Adaptor';

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
    get adaptor(){
        if(!this._adaptor){
            this._adaptor = new Adaptor(this.element);
        }
        return this._adaptor;
    }

    /**
    * the scratch value of the Incident should return back the triplette 
    * x, y, zoom
    * We consider as the viewport the parent node of our element and we calculate
    * its initial position taking in consideration the relative position of our 
    * element into its parent node. The initial zoom is calculated out of the 
    * scaleX value of our element
    **/
    getScratchValue(){
        return this.adaptor.calcXYZoom();
    }
    
    /**
     * 
    **/
    onGetContext(){
        this.progressMethod = this.adaptor.createProgressFunction({
            start: this.initialValue,
            target: this.targetValue
        });
    }

    /**
    * 
    **/
    onProgress(fraction, millisecond){
        const vals = this.progressMethod(fraction);
        this.element.style.transform = `translateX(${vals.translateX}px) translateY(${vals.translateY}px) scaleX(${vals.scale}) scaleY(${vals.scale})`;
    }
}