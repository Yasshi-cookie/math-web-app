import { ColorCode } from "../../../lib/ColorCode";

export class BaseDraw {
    /**
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        cRCtxt2D
    ) {
        this.cRCtxt2D = cRCtxt2D;
    }

    begin = () => {
        this.cRCtxt2D.beginPath();
    }

    close = () => {
        this.cRCtxt2D.closePath();
    }

    fill = () => {
        this.cRCtxt2D.fill();
    }

    /**
     * @param {string} calorCode
     */
    setColor(calorCode = ColorCode.skyBlue) {
        this.cRCtxt2D.fillStyle = calorCode;
    }
}
