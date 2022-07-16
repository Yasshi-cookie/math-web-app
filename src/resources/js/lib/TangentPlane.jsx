import { Matrix } from "./Matrix/Matrix";
import { RotateMatrix } from "./Matrix/RotateMatrix";
import { Vector } from "./Vector";

/**
 * 接平面
 */
export class TangentPlane {
    /**
     * 単位法ベクトル
     * @type {Vector}
     */
    unitNormal;

    /**
     * 単位接ベクトル
     * @type {Vector}
     */
    unitTangent;

    /**
     * 角度（unitNormalの向き）
     * @type {number}
     */
    theta;

    /**
     * @param {number} theta
     */
    constructor(
        theta
    ) {
        this.theta = theta;
        this.unitNormal = new Vector(Math.cos(theta), Math.sin(theta));
        this.unitTangent = (new RotateMatrix(Math.PI / 2)).rotateVector(this.unitNormal);
    }

    reflectWhenCollideToTangentPlane = (velocity) => {
        return Matrix.productMatrixVector(this.reflectionMatrix(), velocity);
    }

    reflectionMatrix = () => {
        return new Matrix(
            new Vector(- Math.cos(2 * this.theta), - Math.sin(2 * this.theta)),
            new Vector(- Math.sin(2 * this.theta), Math.cos(2 * this.theta))
        )
    }
}
