import { initial } from 'lodash';
import { Vec2 } from '../Math';

type LinePointCallback = (point?: Vec2, index?: number) => void;

/**
 * All y coordinates should be negative because we set the origin to the bottom left but the canvas default is in the top left.
 * Thus we do this shortcut.
 */
export class Graphics {
    private static ctx: CanvasRenderingContext2D;

    static init(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    static drawCircle({ x, y }: Vec2, radius: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, -y, radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    static drawText(
        text: string,
        { x, y }: Vec2,
        size: number,
        color: string,
        font: string
    ) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px ${font}`;
        this.ctx.fillText(text, x, -y);
    }

    static drawLine(p1: Vec2, p2: Vec2, width: number, color: string) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, -p1.y);
        this.ctx.lineTo(p2.x, -p2.y);
        this.ctx.stroke();
    }

    static drawLineTo(origin: Vec2, dir: Vec2, width: number, color: string) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(origin.x, -origin.y);
        this.ctx.lineTo(origin.x + dir.x, -origin.y - dir.y);
        this.ctx.stroke();
    }

    private static drawLinesWithCallback(
        points: Vec2[],
        width: number,
        color: string,
        close: boolean,
        callback: LinePointCallback
    ) {
        if (points.length > 1) {
            const origin = points[0];
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = width;
            this.ctx.beginPath();
            this.ctx.moveTo(origin.x, -origin.y);

            for (let i = 1; i < points.length; i++) {
                const point = points[i];
                this.ctx.lineTo(point.x, -point.y);
            }

            if (close) this.ctx.closePath();
            this.ctx.stroke();

            if (callback) {
                for(let i = 0; i < points.length; i++) {
                    callback(points[i], i)
                }
            }
        } else {
            console.error(
                'Attempting to run `drawLinesWithCallback` helper function with less than 2 points!'
            );
        }
    }

    static drawLines(points: Vec2[], width: number, color: string, callback?: LinePointCallback) {
        this.drawLinesWithCallback(points, width, color, false, callback);
    }

    static drawLinesAndClose(points: Vec2[], width: number, color: string, callback?: LinePointCallback) {
        this.drawLinesWithCallback(points, width, color, true, callback);
    }

    static drawLinesWithControls(
        points: Vec2[],
        width: number,
        color: string,
        closed: boolean,
        controlRadius: number,
        controlColor: string,
        selectedColor: string,
        selectedIndex: number,
        callback?: (point: Vec2, index: number, selected: boolean) => void
    ) {
        this.drawLinesWithCallback(points, width, color, closed, (point, i) => {
            const isSelected = i === selectedIndex
            this.drawCircle(
                { x: point.x, y: point.y },
                controlRadius,
                isSelected ? selectedColor : controlColor
            );
            callback(point, i, isSelected);
        });
    }

    static fillShape(points: Vec2[], color: string) {
        const origin = points[0];
        if(origin) {
            this.ctx.beginPath();
            this.ctx.moveTo(origin.x, -origin.y);
            
            for(let i = 1; i < points.length; i++) {
                const point = points[i];                
                this.ctx.lineTo(point.x, -point.y)
            }

            this.ctx.closePath();
            
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
    }
}
