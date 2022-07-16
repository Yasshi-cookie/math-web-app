import { Canvas } from "../../../lib/Canvas";
import { ColorCode } from "../../../lib/ColorCode";
import { BossBrick } from "../BossBrick";
import { BaseDraw } from "./BaseDraw";

export class DrawBossBrick extends BaseDraw {
    /**
     * @type {string}
     */
    color = ColorCode.darkRed;

    /**
     * @param {BossBrick} bossBrick
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        bossBrick,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.bossBrick = bossBrick;
    }

    draw = () => {
        if (!this.bossBrick.display_flg) {
            return;
        }

        this.begin();
        this.setShape();
        this.setColor(this.getColor());
        this.fill();
        this.close();
    }

    setShape = () => {
        this.cRCtxt2D.rect(
            this.bossBrick.shape.coordinate.x,
            this.bossBrick.shape.coordinate.y,
            this.bossBrick.shape.width,
            this.bossBrick.shape.height
        );
    }

    /**
     * @returns {string}
     */
    getColor = () => {
        let colorCode = new ColorCode(ColorCode.darkRed);
        if (this.bossBrick.lives.life === 3) {
            return colorCode.code;
        }

        if (this.bossBrick.lives.life === 2) {
            return colorCode.getDarkerRed().code;
        }

        if (this.bossBrick.lives.life === 1) {
            return colorCode.getDarkerRed().getDarkerRed().code;
        }

        return colorCode.getDarkerRed().getDarkerRed().getDarkerRed().code;
    }
}
