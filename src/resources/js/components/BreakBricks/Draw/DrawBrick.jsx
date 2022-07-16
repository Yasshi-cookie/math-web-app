import { Canvas } from "../../../lib/Canvas";
import { ColorCode } from "../../../lib/ColorCode";
import { Brick } from "../Brick";
import { BaseDraw } from "./BaseDraw";

export class DrawBrick extends BaseDraw {
    /**
     * @param {Brick} brick
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        brick,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.brick = brick;
    }

    draw = () => {
        if (!this.brick.display_flg) {
            return;
        }

        this.begin();
        this.setShape();
        this.setColor(ColorCode.silver);
        this.fill();
        this.close();
    }

    setShape = () => {
        this.cRCtxt2D.rect(
            this.brick.shape.coordinate.x,
            this.brick.shape.coordinate.y,
            this.brick.shape.width,
            this.brick.shape.height
        );
    }
}
