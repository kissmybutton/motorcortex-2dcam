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
            x: viewportDims.x/2,
            y: viewportDims.y/2
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
            Y: elBoundingRect.top - parentBoundingRect.top
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
     * @param {number} x - target x
     * @param {number} y - target y 
     * @param {number} zoom - target zoom
     * @param {obmect} idlePosition - the idle position of the element on its parent
     * @param {number} viewportCenter - the viewport center point 
     */
    calcTransform(initialTransofrm, x, y, zoom){

    }
}