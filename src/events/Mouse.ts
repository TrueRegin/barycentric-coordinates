import { toCanvasSpace } from '../coords/Coordinates';
import { Vec2 } from '../Math';

const mousePos: Vec2 = { x: -1000, y: -1000 };
let mousedown = false;
let registered = false;
let callbacks = {
    pan: {} as { [key: string]: MousePanCallback },
};

export function RegisterMouseListeners() {
    if (!registered) {
        window.addEventListener('mousedown', (event) => {
            mousedown = true;
        });

        window.addEventListener('mouseup', (event) => {
            mousedown = false;
        });

        window.addEventListener('mousemove', (event) => {
            mousePos.x = event.clientX;
            mousePos.y = event.clientY;
            if (mousedown === true) {
                for (let key in callbacks.pan) {
                    const callback = callbacks.pan[key];
                    callback({ x: event.movementX, y: event.movementY });
                }
            }
        });
        registered = true;
    }
}

export function getMouseInCanvasSpace() {
    return toCanvasSpace(mousePos);
}

export function getMouseInScreenSpace() {
    return mousePos;
}

type MousePanCallback = (pos?: Vec2) => void;
export function addMousePanListener(callback: MousePanCallback): String {
    const size = Object.keys(callbacks.pan).length.toString();
    callbacks.pan[size] = callback;
    return size;
}

export function removeMousePanListener(id: string) {
    delete callbacks.pan[id];
}
