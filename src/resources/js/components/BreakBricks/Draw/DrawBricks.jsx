import { Brick } from "../Brick";
import { BricksDirectProduct } from "../BricksDirectProduct";
import { BaseDraw } from "./BaseDraw";
import { DrawBrick } from "./DrawBrick";

export class DrawBricks extends BaseDraw {
    /**
     * @param {BricksDirectProduct} bricksDirectProduct
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        bricksDirectProduct,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.bricksDirectProduct = bricksDirectProduct;
    }

    draw = () => {
        for(var c = 0; c < Brick.columnCount; c++) {
            for(var r = 0; r < Brick.rowCount; r++) {
                let drawBrick = new DrawBrick(
                    this.bricksDirectProduct.getBrickByRowCol(r, c),
                    this.canvas,
                    this.cRCtxt2D
                )

                drawBrick.draw();
            }
        }
    }
}
