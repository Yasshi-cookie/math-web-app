import { Vector } from "../Vector";

export class Circle {
    /**
     * @param {Vector} position
     * @param {number} radius
     */
    constructor(
        position,
        radius
    ) {
        this.position = position;
        this.radius = radius;
    }
}
