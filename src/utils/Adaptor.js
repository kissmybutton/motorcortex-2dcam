import getMatrix2D from './matrix2d';

export default class Adaptor {
    getMatrix(el){
        return getMatrix2D(el);
    }

    getViewPortCenter(el){
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
     * without any style manipulation by us. We consider this position as the
     * idle position of the element on its parent.
     * @param {HTMLElement} el 
     */
    getIdlePosition(el){
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
    calcXYZoom(el){
        const matrix = this.getMatrix(el);

        // the absolute position of our element on its parent
        const position = this.getIdlePosition(el);

        // the current X,Y of our element, having zoom=1, scale=1
        const viewportCenter = this.getViewPortCenter(el);
        const currentOneToOneCenter = {
            x: viewportCenter.x - position.x,
            y: viewportCenter.y - position.y
        }

        // the current X,Y of our element
        const currentCenter = {
            x: currentOneToOneCenter.x / matrix.scaleX,
            y: currentOneToOneCenter.y / matrix.scaleY
        }

        return {
            x: currentCenter.x,
            y: currentCenter.y,
            zoom: matrix.scaleX
        }
    }

    /**
     * 
     * @param {object} initialTransofrm - the initial transform as calculated on this.calcXYZoom
     * @param {number} x - target x
     * @param {number} y - target y 
     * @param {number} zoom - target zoom 
     */
    calcTransform(initialTransofrm, x, y, zoom){

    }
}