import { distanceSquared, Vec2 } from './Math';
import {
    BACKGROUND as BACKGROUND_COLOR,
    POINTS,
    POINT_COLOR,
    POINT_RADIUS,
    TRIANGLE_COLOR,
    TRIANGLE_WIDTH,
    CURSOR_RADIUS,
    CURSOR_VALID_COLOR,
    CURSOR_INVALID_COLOR,
    INTERACT_RADIUS,
} from './Constants';
import {
    addMousePanListener,
    getMouseInCanvasSpace,
    RegisterMouseListeners,
} from './events/Mouse';
import { getTransform, translate } from './coords/Transform';
import { Graphics } from './coords/Graphics';
import { isInTriangle } from './barycentric/barycentric';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { toCanvasSpace } from './coords/Coordinates';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let selected = -1;
let curr_points = POINTS;

/**
 * Resize the window so no scroll bar appears.
 */
window.addEventListener('resize', resize);
window.addEventListener('load', startApp);
function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
}

function startApp() {
    RegisterMouseListeners();
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    Graphics.init(ctx);
    document.body.appendChild(canvas);
    resize();

    addMousePanListener(({ x, y }) => {
        

        if (selected == -1) {
            // translate(x, y);
        } else {
            curr_points[selected].x += x;
            curr_points[selected].y -= y;
        }
    });

    window.addEventListener('mousedown', (event) => {
        const mouse = { x: event.clientX, y: event.clientY };
        const coords = toCanvasSpace(mouse);
        for(let i = 0; i < curr_points.length; i++) {
            let point = curr_points[i];
            if(distanceSquared(coords, point) < INTERACT_RADIUS) {
                selected = i;
            }
        }
    });

    window.addEventListener('mouseup', () => {
        selected = -1;
    });

    setInterval(() => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        render(curr_points);
    }, 1000 / 60);
}

/**
 * We want to draw some sort of spline in our render function
 * that goes through a list of points.
 *
 * @param points - A list of target points for a spline.
 */
function render(points: Vec2[]) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const transform = getTransform();
    ctx.translate(0, window.innerHeight);
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.s, transform.s);
    drawTriangle(points);
    drawCursor(points as [Vec2, Vec2, Vec2]);

    ctx.resetTransform();
}

function drawCursor(points: [Vec2, Vec2, Vec2]) {
    const mouse = getMouseInCanvasSpace();
    const color = isInTriangle(points)
        ? CURSOR_VALID_COLOR
        : CURSOR_INVALID_COLOR;
    Graphics.drawCircle(mouse, CURSOR_RADIUS, color);
}

const aCharCode = 'A'.charCodeAt(0);
function drawTriangle(points: Vec2[]) {
    Graphics.drawLinesWithControls(
        points,
        TRIANGLE_WIDTH,
        TRIANGLE_COLOR,
        true,
        POINT_RADIUS,
        POINT_COLOR,
        '#f53f00',
        selected,
        (point, i, selected) => {
            const newPoint: Vec2 = { x: point.x + 10, y: point.y + 10 };
            // Draws a piece of text above a control point with letters A, B, C, D, etc...
            Graphics.drawText(
                String.fromCharCode(aCharCode + i),
                newPoint,
                20,
                selected ? '#f53f00' : POINT_COLOR,
                'monospace'
            );
        }
    );
}

window.oncontextmenu = (e) => {
    e.preventDefault();
};
