import { Canvas } from "../../../lib/Canvas";
import { ColorCode } from "../../../lib/ColorCode";
import { Paddle } from "../Paddle";
import { BaseDraw } from "./BaseDraw";

export class DrawPaddle extends BaseDraw {
    /**
     * @param {Paddle} paddle
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
     constructor(
        paddle,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.paddle = paddle;
    }

    draw = () => {
        this.begin();
        this.setShape();
        this.setColor(ColorCode.mediumSeaGreen);
        this.fill();
        this.close();
    }

    setShape = () => {
        this.cRCtxt2D.rect(
            this.paddle.shape.coordinate.x,
            this.paddle.shape.coordinate.y,
            this.paddle.shape.width,
            this.paddle.shape.height
        );
    }
}
