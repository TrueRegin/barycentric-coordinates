/**
 * Convert from browser mouse coordinates to canvas coordinates.
 */
import { Vec2 } from '../Math'
import { getTransform } from './Transform'


export function toCanvasSpace(temp: Vec2) {
    const point: Vec2 = {...temp};
    const transform = getTransform()
    // Setting the origin to bottom left instead of top left.
    point.y = window.innerHeight - point.y;
    point.x -= transform.x;
    point.y -= transform.y;
    point.x /= transform.s;
    point.y /= transform.s;

    return point;
}

/**
 * Convert from the canvas coordinates to browser coordinates.
 */
export function toWindowSpace(temp: Vec2) {
    const point: Vec2 = {...temp};
    const transform = getTransform()
    point.x *= transform.s;
    point.y *= transform.s;
    point.x += transform.x;
    point.y += transform.y;
    point.y = window.innerHeight - point.y;

    return point;
}