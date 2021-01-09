import getMatrix2D from './matrix2d';

export default class Adaptor {
    constructor(el){
        this.el = el;
        this.matrix = this._getMatrix(el);
        this.viewportCenter = this._getViewPortCenter();
        this.idlePosition = this._getIdlePosition();
    }

    _getMatrix(el){
        return getMatrix2D(el);
    }

    _getViewPortCenter(){
        const el = this.el;
        const parentNode = el.parentNode;
        const viewportDims = {
            width: parseFloat(getComputedStyle(parentNode, null).width.replace("px", "")),
            height: parseFloat(getComputedStyle(parentNode, null).height.replace("px", ""))
        }

        return {
            x: viewportDims.width/2,
            y: viewportDims.height/2
        };
    }

    /**
     * Returns the position of the element on its parent on its initial state, 
     * with translateX and translateY = 0. We consider this position as the
     * idle position of the element on its parent.
     */
    _getIdlePosition(){
        const el = this.el;
        // bounding rect: {top, right, bottom, left}
        const elBoundingRect = el.getBoundingClientRect();
        const parentBoundingRect = el.parentNode.getBoundingClientRect();

        // the absolute position of our element on its parent
        return {
            x: elBoundingRect.left - parentBoundingRect.left,
            y: elBoundingRect.top - parentBoundingRect.top
        }
    }

    /**
     * 
     * @param {HTMLElement} el 
     * @returns {object} x, y, zoom, initialTransofrm{x,y}
     */
    calcXYZoom(){
        const matrix = this.matrix;
        const position = this.idlePosition;
        const viewportCenter = this.viewportCenter;
        
        const currentOneToOneCenter = {
            x: viewportCenter.x - position.x,
            y: viewportCenter.y - position.y
        }

        // the current X,Y of our element
        const currentCenter = {
            x: currentOneToOneCenter.x / matrix.scaleX,
            y: currentOneToOneCenter.y / matrix.scaleY
        }

        return {...currentCenter, zoom: matrix.scaleX};
    }

    /**
     * @param {object} params - {start{x,y,zoom}, target{x,y.zoom}}
     */
    createProgressFunction(params){
        console.log('in here');
        const start = this._xyzoomToTranslate(params.start);
        const target = this._xyzoomToTranslate(params.target);

        const lineLength = Math.sqrt(Math.pow(target.y - start.y, 2) + Math.pow(target.x - start.x, 2));
        const theta = Math.atan(target.y - start.y / target.x - start.x);

        return function progress(fraction){
            const distanceOnLine = fraction * lineLength;
            return {
                translateX: distanceOnLine * Math.cos(theta) - start.x,
                translateY: distanceOnLine * Math.sin(theta) - start.y,
                scale: (target.scale - start.scale) * fraction + start.scale
            }
        }
    }

    _xyzoomToTranslate(vals){
        // the target point from the top-left corner of the element, having applied the target zoom
        const targetCenter = {
            x: vals.zoom * vals.x,
            y: vals.zoom * vals.y
        };
        const move = {
            x: this.viewportCenter.x - targetCenter.x,
            y: this.viewportCenter.y - targetCenter.y
        }
        return {
            x: move.x - this.idlePosition.x,
            y: move.y - this.idlePosition.y,
            scale: vals.zoom
        }
    }
}