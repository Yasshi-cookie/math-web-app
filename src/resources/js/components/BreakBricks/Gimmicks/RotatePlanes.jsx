import { Canvas } from "../../../lib/Canvas";
import { Vector } from "../../../lib/Vector";
import { RotatePlane } from "./RotatePlane";

export class RotatePlanes {
    /**
     * @var {Array<RotatePlane>}
     */
    items;

    static leftRotatePlaneCoordinate = new Vector(80, 220);
    static rightRotatePlaneCoordinate = new Vector(Canvas.defaultWidth - RotatePlane.width - 80, 220);

    /**
     * @param {Array<RotatePlane>} items
     */
    constructor(
        items = RotatePlanes.getInitialInstance()
    ) {
        this.items = items;
    }

    static getInitialInstance = () => {
        let rotatePlanes = [];
        let leftRotatePlane = new RotatePlane();
        leftRotatePlane.setCoordinate(RotatePlanes.leftRotatePlaneCoordinate)
        rotatePlanes.push(leftRotatePlane);

        let rightRotatePlane = new RotatePlane();
        rightRotatePlane.setCoordinate(RotatePlanes.rightRotatePlaneCoordinate)
        rightRotatePlane.setAngularVelocity((-1) * leftRotatePlane.angularVelocity);
        rotatePlanes.push(rightRotatePlane);

        return rotatePlanes;
    }

    getItems = () => {
        return this.items;
    }
}
