import { TRIANGLE_FILL } from '../Constants';
import { Graphics } from '../coords/Graphics';
import { getMouseInCanvasSpace } from '../events/Mouse';
import { Vec2 } from '../Math';

export function isInTriangle(points: [Vec2, Vec2, Vec2]): boolean {
    const P0 = points[0];
    const MOUSE = getMouseInCanvasSpace();
    const R: Vec2 = { x: MOUSE.x - P0.x, y: MOUSE.y - P0.y };
    const Q1: Vec2 = { x: points[1].x - P0.x, y: points[1].y - P0.y };
    const Q2: Vec2 = { x: points[2].x - P0.x, y: points[2].y - P0.y };
    const RQ1 = (R.x * Q1.x) + (R.y * Q1.y)
    const RQ2 = (R.x * Q2.x) + (R.y * Q2.y)
    const Q1Q1 = (Q1.x * Q1.x) + (Q1.y * Q1.y)
    const Q2Q2 = (Q2.x * Q2.x) + (Q2.y * Q2.y)
    const Q1Q2 = (Q1.x * Q2.x) + (Q1.y * Q2.y)

    const det = 1 / (Q1Q1 * Q2Q2 - Q1Q2 * Q1Q2);
    const w1 = (Q2Q2 * RQ1 + -Q1Q2 * RQ2) * det;
    const w2 = (-Q1Q2 * RQ1 + Q1Q1 * RQ2) * det;

    const inTriangle = w1 >= 0 && w2 >= 0 && (w1 + w2) <= 1;
    inTriangle ? fillTriangle(points) : undefined;
    drawBarycentricBasis(P0, Q1, Q2, w1, w2);
    return inTriangle;
}

function fillTriangle(points: Vec2[]) {
    Graphics.fillShape(points, TRIANGLE_FILL);
}

function drawBarycentricBasis(P0: Vec2, Q1: Vec2, Q2: Vec2, w1: number, w2: number) {
    // The 2 basis vectors of the barycentric coordinate space.
    const newQ1 = {x: Q1.x * w1, y: Q1.y * w1};
    const newQ2 = {x: Q2.x * w2, y: Q2.y * w2};

    // The vector from P0 to newQ1
    const P0newQ1 = {x: P0.x + newQ1.x, y: P0.y + newQ1.y}
    Graphics.drawLineTo(P0, newQ1, 2, "#0aDD43");
    Graphics.drawLineTo(P0newQ1, newQ2, 2, "#FA4D33");
}
