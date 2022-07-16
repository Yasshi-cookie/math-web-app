import { TangentPlane } from "../TangentPlane";
import { Vector } from "../Vector";

export class Rectangle {
    /**
     * @param {Vector} coordinate
     * @param {number} width
     * @param {number} height
     */
    constructor(
        coordinate,
        width,
        height
    ) {
        this.coordinate = coordinate;
        this.width = width;
        this.height = height;
    }

    getVertexRightTop = () => {
        return Vector.add(
            this.coordinate,
            new Vector(this.width, 0)
        );
    }

    getVertexRightBottom = () => {
        return Vector.add(
            this.coordinate,
            new Vector(this.width, this.height)
        );
    }

    getVertexLeftTop = () => {
        return this.coordinate;
    }

    getVertexLeftBottom = () => {
        return Vector.add(
            this.coordinate,
            new Vector(0, this.height)
        );
    }

    getCenter = () => {
        return Vector.add(
            this.coordinate,
            new Vector(this.width/2, this.height/2)
        );
    }

    /**
     *
     * @param {Vector} point
     * @returns {TangentPlane}
     */
    getTangentPlaneAtPoint = (point) => {
        if (
            point.x > this.coordinate.x && point.x < this.coordinate.x + this.width
            && (point.y === this.coordinate.y || point.y === this.coordinate.y + this.height)
        ) {
            return new TangentPlane(Math.PI / 2);
        }

        if (
            point.y > this.coordinate.y && point.y < this.coordinate.y + this.height
            && (point.x === this.coordinate.x || point.x === this.coordinate.x + this.width)
        ) {
            return new TangentPlane(0);
        }

        // Canvasは「x軸：右向きが正、y軸：下向きが正」に注意
        if (Vector.equal(this.getVertexRightTop(), point)) {
            return new TangentPlane((-1/4) * Math.PI);
        }

        if (Vector.equal(this.getVertexRightBottom(), point)) {
            return new TangentPlane((1/4) * Math.PI);
        }

        if (Vector.equal(this.getVertexLeftTop(), point)) {
            return new TangentPlane((-3/4) * Math.PI);
        }

        if (Vector.equal(this.getVertexLeftBottom(), point)) {
            return new TangentPlane((3/4) * Math.PI);
        }

        // どれにも当てはまらない場合
        return new TangentPlane(0);
    }
}
