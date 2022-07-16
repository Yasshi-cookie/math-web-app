import { Canvas } from "../../lib/Canvas";
import { Matrix } from "../../lib/Matrix/Matrix";
import { TangentPlane } from "../../lib/TangentPlane";
import { Vector } from "../../lib/Vector";
import { Paddle } from "./Paddle";

export class Ball {
    static initialVelocity = new Vector(2, -2);
    static initialRadius = 8;

    /**
     * @param {Vector} position
     * @param {Vector} velocity
     * @param {number} radius
     */
    constructor(
        position,
        velocity = Ball.initialVelocity,
        radius = Ball.initialRadius
    ) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
    }

    updateVelocityWhenCollideSide = (canvasWidth) => {
        if(this.position.x + this.velocity.x + this.radius > canvasWidth || this.position.x + this.velocity.x - this.radius < 0) {
            const sidePlane = new TangentPlane(0);
            this.velocity = sidePlane.reflectWhenCollideToTangentPlane(this.velocity);
        }
    }

    updateVelocityWhenCollideTop = () => {
        if(this.position.y + this.velocity.y - this.radius < 0) {
            const topPlane = new TangentPlane((1/2) * Math.PI);
            this.velocity = topPlane.reflectWhenCollideToTangentPlane(this.velocity);
        }
    }

    updateVelocityWhenPaddleHitBall = () => {
        this.velocity = Matrix.productMatrixVector(Matrix.reflectionByXAxis(), this.velocity);
    }

    /**
     * @param {Canvas} canvas
     */
    setInitialPosition = (canvas) => {
        this.position = Ball.#getInitialPositionByCanvas(canvas);
    }
    setInitialVelocity = () => {
        this.velocity = Ball.initialVelocity;
    }

    /**
     * @param {Canvas} canvas
     * @returns {Ball}
     */
    static newInitialInstanceByCanvas = (canvas) => {
        return new Ball(
            Ball.#getInitialPositionByCanvas(canvas)
        );
    }

    /**
     * @param {Canvas} canvas
     * @returns {Vector}
     */
    static #getInitialPositionByCanvas = (canvas) => {
        return new Vector(canvas.width / 2, canvas.height - Paddle.initialHeight - Ball.initialRadius);
    }
}
