import { ColorCode } from "../../../lib/ColorCode";

export class BaseDrawText {
    /**
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        cRCtxt2D
    ) {
        this.cRCtxt2D = cRCtxt2D;
    }

    /**
     *
     * @param {string} font
     */
    setFont = (font = "16px Arial") => {
        this.cRCtxt2D.font = font;
    }

    /**
     * @param {string} colorCode
     */
    setColor(colorCode = ColorCode.skyBlue) {
        this.cRCtxt2D.fillStyle = colorCode;
    }
}
