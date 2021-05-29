export type Vec2 = {x: number, y: number};

export function distance(v1: Vec2, v2: Vec2) {
    return Math.sqrt(distanceSquared(v1, v2));
}

export function distanceSquared(v1: Vec2, v2: Vec2) {
    return Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2);
}