import { TangentPlane } from "../TangentPlane";
import { Vector } from "../Vector";

export class Rectangle {
    /**
     * @var {Vector}
     */
    coordinate

    /**
     * @var {number}
     */
    width

    /**
     * @var {number}
     */
    height

    /**
     * @var {number}
     */
    normalAngle

    /**
     * @var {Vector}
     */
    normalVector

    /**
     * @var {Vector}
     */
    tangentVector

    /**
     * @param {Vector} coordinate
     * @param {number} width
     * @param {number} height
     */
    constructor(
        coordinate,
        width,
        height,
        normalAngle = Math.PI / 2
    ) {
        this.coordinate = coordinate;
        this.width = width;
        this.height = height;

        this.normalAngle = normalAngle;
        this.setNormalVector(normalAngle);
        this.setTangentVector(normalAngle);
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
        // pointが上下の面にあるとき
        if (
            point.x > this.coordinate.x && point.x < this.coordinate.x + this.width
            && (point.y === this.coordinate.y || point.y === this.coordinate.y + this.height)
        ) {
            return new TangentPlane(Math.PI / 2);
        }

        // pointが左右の面にあるとき
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

    /**
     * @param {number} normalAngle
     */
    setNormalVector = (normalAngle) => {
        this.normalVector = new Vector(Math.cos(normalAngle), Math.sin(normalAngle));
    }

    /**
     * @param {number} normalAngle
     */
    setTangentVector = (normalAngle) => {
        let tangentAngle = normalAngle - Math.Pi / 2;
        this.tangentVector = new Vector(Math.cos(tangentAngle), Math.sin(tangentAngle));
    }
}
