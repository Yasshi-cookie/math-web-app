import { Canvas } from "../../lib/Canvas";
import { Rectangle } from "../../lib/Shapes/Rectangle";
import { Vector } from "../../lib/Vector";
import { Lives } from "./Lives";

export class Paddle {
    static initialHeight = 10;
    static initialWidth = 75;
    static initialLives = new Lives(3);

    shape;
    lives;

    /**
     * @param {Vector} position
     * @param {number} width
     * @param {number} height
     * @param {Lives} lives
     */
    constructor(
        position,
        width = Paddle.initialWidth,
        height = Paddle.initialHeight,
        lives = Paddle.initialLives
    ) {
        this.shape = new Rectangle(
            position,
            width,
            height
        );
        this.lives = lives;
    }

    /**
     * パドルのx座標の初期値をセット
     * @param {number} canvasWidth
     */
    setInitialShapeCoordinateByCanvasWidth = (canvasWidth) => {
        this.shape.coordinate.x = Paddle.#getInitialXByCanvasWidth(canvasWidth);
    }

    /**
     *
     * @param {Canvas} canvas
     * @returns {Paddle}
     */
    static newInitialInstanceByCanvas = (canvas) => {
        return new Paddle(Paddle.#getInitialShapeCoordinateByCanvas(canvas));
    }

    /**
     * @param {number} canvasWidth
     * @returns {number}
     */
    static #getInitialXByCanvasWidth = (canvasWidth) => {
        return (canvasWidth - Paddle.initialWidth) / 2;
    }

    /**
     * @param {number} canvasHight
     * @returns {number}
     */
    static #getInitialYByCanvasHeight = (canvasHight) => {
        return (canvasHight - Paddle.initialHeight);
    }

    /**
     * @param {Canvas} canvas
     * @returns {Vector}
     */
    static #getInitialShapeCoordinateByCanvas = (canvas) => {
        return new Vector(
            Paddle.#getInitialXByCanvasWidth(canvas.width),
            Paddle.#getInitialYByCanvasHeight(canvas.height)
        );
    }
}
