import { Canvas } from "../../../lib/Canvas";
import { Game } from "../Game/Game";
import { RotatePlane } from "../Gimmicks/RotatePlane";
import { BaseDraw } from "./BaseDraw";
import { DrawBall } from "./DrawBall";
import { DrawBossBrick } from "./DrawBossBrick";
import { DrawBricks } from "./DrawBricks";
import { DrawLives } from "./DrawLives";
import { DrawPaddle } from "./DrawPaddle";
import { DrawRotatePlane } from "./DrawRotatePlane";
import { DrawScore } from "./DrawScore";

export class Draw extends BaseDraw {
    /**
     *
     * @param {Game} game
     * @param {Canvas} canvas
     * @param {CanvasRenderingContext2D} cRCtxt2D
     */
    constructor(
        game,
        canvas,
        cRCtxt2D
    ) {
        super(cRCtxt2D);
        this.canvas = canvas;
        this.game = game;
    }

    /**
     * ゲームに必要な要素を全て描画する
     */
    draw = () => {
        // パドル
        this.getDrawPaddle().draw();
        // ボール
        this.getDrawBall().draw();

        /**
         * ギミック
         */
        // 回転平面
        this.getRotatePlane().draw();

        /**
         * 敵
         */
        // ブリック
        this.getDrawBricks().draw();
        // ボスブリック
        this.getDrawBossBrick().draw();

        // パネル
        this.getDrawScore().draw();
        this.getDrawLives().draw();
    }

    crear = () => {
        this.cRCtxt2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     *
     * @returns {DrawPaddle}
     */
    getDrawPaddle = () => {
        return new DrawPaddle(this.game.paddle, this.canvas, this.cRCtxt2D);
    }

    /**
     *
     * @returns {DrawBall}
     */
    getDrawBall = () => {
        return new DrawBall(this.game.ball, this.canvas, this.cRCtxt2D);
    }


    getRotatePlane = () => {
        return new DrawRotatePlane(this.game.rotatePlane, this.canvas, this.cRCtxt2D);
    }

    /**
     *
     * @returns {DrawBricks}
     */
    getDrawBricks = () => {
        return new DrawBricks(this.game.bricksDirectProduct, this.canvas, this.cRCtxt2D);
    }

    /**
     * @returns {DrawBossBrick}
     */
    getDrawBossBrick = () => {
        return new DrawBossBrick(this.game.bossBrick, this.canvas, this.cRCtxt2D);
    }

    /**
     *
     * @returns {DrawScore}
     */
    getDrawScore = () => {
        return new DrawScore(this.game.score, this.canvas, this.cRCtxt2D);
    }

    /**
     *
     * @returns {DrawLives}
     */
    getDrawLives = () => {
        return new DrawLives(this.game.paddle, this.canvas, this.cRCtxt2D);
    }

}
