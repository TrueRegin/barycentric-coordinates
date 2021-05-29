import { clamp } from 'lodash';
import { MAX_DIST } from '../Constants';

// The transform we use throughout our application stored in a single place.
const transform: { x: number; y: number; s: number } = { x: 0, y: 0, s: 1 };

/**
 * Transform modification functions.
 */

export function setZoom(s: number) {
    transform.s = clamp(s, 0.1, 10);
}

export function zoom(sAmt: number) {
    setZoom(transform.s + sAmt);
}

export function setTranslation(x: number, y: number) {
    transform.x = clamp(x, -MAX_DIST, MAX_DIST);
    transform.y = clamp(y, -MAX_DIST, MAX_DIST);
}

export function translate(xAmt: number, yAmt: number) {
    setTranslation(transform.x + xAmt, transform.y + yAmt);
}

/**
 * 
 */
export function getTransform() {
    return {...transform};
}