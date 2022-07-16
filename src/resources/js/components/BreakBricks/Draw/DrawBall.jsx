import { Canvas } from "../../../lib/Canvas";
import { ColorCode } from "../../../lib/ColorCode";
import { Ball } from "../Ball";
import { BaseDraw } from "./BaseDraw";

export class DrawBall extends BaseDraw {
    /**
     * @param {Ball} ball
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        ball,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.ball = ball;
    }

    draw = () => {
        this.begin();
        this.setShape();
        this.setColor(ColorCode.dimGray);
        this.fill();
        this.close();
    }

    setShape = () => {
        this.cRCtxt2D.arc(
            this.ball.position.x,
            this.ball.position.y,
            this.ball.radius,
            0,
            Math.PI*2
        );
    }
}
