import { Vec2 } from "./Math";

// WORLD CONSTANTS
export const MAX_DIST = 1000;

// MOUSE CONSTANTS
export const CURSOR_RADIUS = 5;
export const CURSOR_VALID_COLOR = "#00E33A"
export const CURSOR_INVALID_COLOR = "#E33A00"

// 
export const BACKGROUND = "#00003A";

// Constants relating to spline points.
export const POINTS: Vec2[] = [
    {x: 300, y: 400},
    {x: 350, y: 600},
    {x: 400, y: 400}
]
export const POINT_RADIUS = 7;
export const INTERACT_RADIUS = POINT_RADIUS * 2.3;
export const POINT_COLOR = "#FFFFFF";

export const TRIANGLE_WIDTH = 1;
export const TRIANGLE_FILL = "#00EE4333"
export const TRIANGLE_COLOR = "#D3D3EF";
