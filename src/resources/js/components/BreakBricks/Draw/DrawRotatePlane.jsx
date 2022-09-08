import { Canvas } from "../../../lib/Canvas";
import { ColorCode } from "../../../lib/ColorCode";
import { RotatePlane } from "../Gimmicks/RotatePlane";
import { BaseDraw } from "./BaseDraw";

/**
 * TODO:
 * rotate()関数でrectangleを回転させる
 * 参照：https://lab.syncer.jp/Web/JavaScript/Canvas/9/
 */
export class DrawRotatePlane extends BaseDraw {
    /**
     * @param {RotatePlane} rotatePlane
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        rotatePlane,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.rotatePlane = rotatePlane;
    }

    draw = () => {
        this.begin();

        // TODO: 描画の回転処理とオブジェクトの回転処理（座標の更新）を行うrotate関数を作成する。
        // 回転操作開始
        this.cRCtxt2D.save();

        // this.cRCtxt2D.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.cRCtxt2D.translate(this.rotatePlane.shape.getCenter().x, this.rotatePlane.shape.getCenter().y);
        this.cRCtxt2D.rotate(this.rotatePlane.angle);
        this.cRCtxt2D.translate(- this.rotatePlane.shape.getCenter().x, - this.rotatePlane.shape.getCenter().y);

        // this.cRCtxt2D.translate(- this.canvas.width / 2, - this.canvas.height / 2);

        this.setShape();

        this.cRCtxt2D.restore();
        this.cRCtxt2D.save();

        this.rotatePlane.updateThetaForNextFrame();
        // 回転操作終了

        this.setColor(ColorCode.skyBlue);
        this.fill();
        this.close();
    }

    setShape = () => {
        this.cRCtxt2D.rect(
            this.rotatePlane.shape.coordinate.x,
            this.rotatePlane.shape.coordinate.y,
            this.rotatePlane.shape.width,
            this.rotatePlane.shape.height
        );
    }
}
