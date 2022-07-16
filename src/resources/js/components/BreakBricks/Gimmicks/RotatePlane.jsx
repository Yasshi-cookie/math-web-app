import { Rectangle } from "../../../lib/Shapes/Rectangle";
import { Vector } from "../../../lib/Vector";

export class RotatePlane {
    /**
     * @param {Rectangle} shape
     * @param {number} theta
     */
    constructor(
        shape = new Rectangle(
            new Vector(80, 220),
            90,
            3
        ),
        theta = 0
    ) {
        this.shape = shape;
        this.theta = theta;
    }

    updateThetaForNextFrame = () => {
        this.theta += (1 / 360) * Math.PI;
    }
}
