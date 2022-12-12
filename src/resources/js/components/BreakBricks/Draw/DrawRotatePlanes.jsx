import { Canvas } from "../../../lib/Canvas";
import { RotatePlanes } from "../Gimmicks/RotatePlanes";
import { BaseDraw } from "./BaseDraw";
import { DrawRotatePlane } from "./DrawRotatePlane";

export class DrawRotatePlanes extends BaseDraw {
    /**
     * @param {RotatePlanes} rotatePlanes
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        rotatePlanes,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.rotatePlanes = rotatePlanes;
    }

    draw = () => {
        this.rotatePlanes.getItems().forEach((rotatePlane) => {
            let drawRotatePlane = new DrawRotatePlane(
                rotatePlane,
                this.canvas,
                this.cRCtxt2D
            );

            drawRotatePlane.draw();
        })
    }
}
