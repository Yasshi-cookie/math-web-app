import { Rectangle } from "../../../lib/Shapes/Rectangle";
import { Vector } from "../../../lib/Vector";

export class RotatePlane {
    /**
     * @var {Rectangle}
     */
    shape;

    /**
     * ゲーム開始時の角度（傾き）
     * @var {number}
     */
    angle;

    /**
     * 角速度
     * @var {number}
     */
    angularVelocity;

    /**
     * 幅
     * @var {number}
     */
    static width = 90;
    /**
     * 高さ（厚さ）
     * @var {number}
     */
    static height = 3;

    /**
     * デフォルトの角度（傾き）
     * @var {number}
     */
    static defaultAngle = 0;
    /**
     * デフォルトの角速度
     * @var {number}
     */
    static defaultAngularVelocity = (1 / 360) * Math.PI;

    /**
     * @param {Rectangle} shape
     * @param {number} theta
     */
    constructor(
        shape = new Rectangle(
            new Vector(0, 0),
            RotatePlane.width,
            RotatePlane.height
        ),
        angle = RotatePlane.defaultAngle,
        angularVelocity = RotatePlane.defaultAngularVelocity
    ) {
        this.shape = shape;
        this.angle = angle;
        this.angularVelocity = angularVelocity;
    }

    updateThetaForNextFrame = () => {
        this.angle += this.angularVelocity;
    }

    /**
     * @param {Vector} vector
     */
    setCoordinate = (vector) => {
        this.shape.coordinate = vector;
    }

    /**
     * @param {number} angularVelocity
     */
    setAngularVelocity = (angularVelocity) => {
        this.angularVelocity = angularVelocity;
    }
}
