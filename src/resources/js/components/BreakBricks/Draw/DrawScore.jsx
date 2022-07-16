import { Canvas } from "../../../lib/Canvas";
import { BaseDrawText } from "./BaseDrawText";

export class DrawScore extends BaseDrawText {
    /**
     * @param {number} score
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        score,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.score = score;
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
        this.cRCtxt2D.fillText("Score: " + this.score, 8, 20);
    }
}
