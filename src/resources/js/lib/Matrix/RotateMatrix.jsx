import { Vector } from "../Vector";
import { Matrix } from "./Matrix";

export class RotateMatrix extends Matrix {
    /**
     * @param {number} theta
     */
    constructor(theta) {
        super(
            new Vector(Math.cos(theta), Math.sin(theta)),
            new Vector(- Math.sin(theta), Math.cos(theta))
        )
    }

    /**
     * vectorをRotateMatrixで回転させて得られるベクトルを返す
     * @param {Vector} vector
     * @returns {Vector}
     */
    rotateVector = (vector) => {
        return Matrix.productMatrixVector(this, vector);
    }
}
