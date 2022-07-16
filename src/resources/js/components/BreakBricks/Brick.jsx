import { Rectangle } from "../../lib/Shapes/Rectangle";
import { Vector } from "../../lib/Vector";

export class Brick {
    static rowCount = 3;
    static columnCount = 5;
    static padding = 10;
    static offsetTop = 60;
    static offsetLeft = 30;

    /**
     * @type {Rectangle}
     */
    shape;

    /**
     * @type {boolean}
     */
    display_flg;

    /**
     * @param {Rectangle} shape
     * @param {boolean} display_flg
     */
    constructor(
        shape = new Rectangle(new Vector(0, 0), 75, 20),
        display_flg = true
    ) {
        this.shape = shape;
        this.display_flg = display_flg;
    }

    /**
     * @param {number} row
     * @param {number} col
     */
    setInitialCoordinate = (row, col) => {
        this.shape.coordinate = new Vector(
            (col * (this.shape.width + Brick.padding)) + Brick.offsetLeft,
            (row * (this.shape.height + Brick.padding)) + Brick.offsetTop
        );
    }
}
