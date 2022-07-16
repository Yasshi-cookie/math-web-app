import { ColorCode } from "../../../lib/ColorCode";
import { Paddle } from "../Paddle";
import { BaseDrawText } from "./BaseDrawText";

export class DrawLives extends BaseDrawText {
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
        this.setFont();
        this.setColor();
        this.setText();
    }

    /**
     * @param {string} text
     */
    setText() {
        this.cRCtxt2D.fillText("Lives: " + this.paddle.lives.life, this.canvas.width - 65, 20);
    }

    setColor() {
        if (this.paddle.lives.isLeftLifeOne()) {
            super.setColor(ColorCode.red)
            return;
        }

        super.setColor();
    }
}
