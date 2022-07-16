import { Rectangle } from "../../../lib/Shapes/Rectangle";
import { Vector } from "../../../lib/Vector";
import { Ball } from "../Ball";

export class CollisionDetectBallAndRectangle {
    /**
     * 円
     * @param {Ball}
     */
    ball;

    /**
     * 長方形
     * @param {Rectangle}
     */
    rectangle;

    /**
     * rectangleの点のうち、ballと最も近いもの
     * @type {Vector}
     */
    rectanglePointClosestToBall;

    /**
     * @param {Ball} ball
     * @param {Rectangle} rectangle
     */
    constructor(
        ball,
        rectangle
    ) {
        this.ball = ball;
        this.rectangle = rectangle;

        this.setRectanglePointClosestToBall();
    }

    /**
     * ballとrectangleが衝突したかどうかを返す
     * @returns {boolean}
     */
    doseDetect = () => {
        return this.hausdorffMetric() <= Number.EPSILON;
    }

    /**
     * ballとrectangleとのハウスドルフ距離（集合間の距離）を返す
     * @returns {number}
     */
    hausdorffMetric = () => {
        return Vector.distance(this.rectanglePointClosestToBall, this.ball.position) - this.ball.radius
    }

    updateBallVelocityWhenCollideRectangle = () => {
        let tangentPlaneAtCollitionPoint = this.rectangle.getTangentPlaneAtPoint(this.rectanglePointClosestToBall);
        // ballの向きを更新
        this.ball.velocity = tangentPlaneAtCollitionPoint.reflectWhenCollideToTangentPlane(this.ball.velocity);
    }

    setRectanglePointClosestToBall = () => {
        this.rectanglePointClosestToBall = this.getRectanglePointClosestToBall();
    }

    /**
     * @returns {Vector}
     */
    getRectanglePointClosestToBall = () => {
        const vertexRightTop = this.rectangle.getVertexRightTop();
        const vertexRightBottom = this.rectangle.getVertexRightBottom();
        const vertexLeftTop = this.rectangle.getVertexLeftTop();
        const vertexLeftBottom = this.rectangle.getVertexLeftBottom();

        const ballPosition = this.ball.position;

        const vectorFromVertexRightTopToBallPosition = Vector.sub(ballPosition, vertexRightTop);
        const vectorFromVertexRightBottomToBallPosition = Vector.sub(ballPosition, vertexRightBottom);
        const vectorFromVertexLeftTopToBallPosition = Vector.sub(ballPosition, vertexLeftTop);
        const vectorFromVertexLeftBottomToBallPosition = Vector.sub(ballPosition, vertexLeftBottom);

        if (vectorFromVertexRightTopToBallPosition.isInDomainXPlusYMinus()) {
            return vertexRightTop;
        };

        if (vectorFromVertexRightBottomToBallPosition.isInDomainXPlusYPlus()) {
            return vertexRightBottom;
        };

        if (vectorFromVertexLeftTopToBallPosition.isInDomainXMinusYMinus()) {
            return vertexLeftTop;
        };

        if (vectorFromVertexLeftBottomToBallPosition.isInDomainXMinusYPlus()) {
            return vertexLeftBottom;
        };


        if (vectorFromVertexRightTopToBallPosition.isInDomainXPlusYPlus() && vectorFromVertexRightBottomToBallPosition.isInDomainXPlusYMinus()) {
            return new Vector(this.rectangle.coordinate.x + this.rectangle.width, ballPosition.y);
        }

        if (vectorFromVertexRightBottomToBallPosition.isInDomainXMinusYPlus() && vectorFromVertexLeftBottomToBallPosition.isInDomainXPlusYPlus()) {
            return new Vector(ballPosition.x, this.rectangle.coordinate.y + this.rectangle.height);
        }

        if (vectorFromVertexLeftBottomToBallPosition.isInDomainXMinusYMinus() && vectorFromVertexLeftTopToBallPosition.isInDomainXMinusYPlus()) {
            return new Vector(this.rectangle.coordinate.x, ballPosition.y);
        }

        if (vectorFromVertexLeftTopToBallPosition.isInDomainXPlusYMinus() && vectorFromVertexRightTopToBallPosition.isInDomainXMinusYMinus()) {
            return new Vector(ballPosition.x, this.rectangle.coordinate.y);
        }

        // どの条件にも該当しない場合、球が長方形の内側に入っているので自分自身を返す
        return ballPosition;
    }
}
