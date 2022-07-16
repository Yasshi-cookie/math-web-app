import { Brick } from "./Brick";

export class Bricks {
    /**
     * @param {Array<Brick>} bricks
     */
    constructor(
        bricks = Bricks.getInitialBricks()
    ) {
        this.bricks = bricks;
    }

    /**
     * @returns {Array<Brick>}
     */
    static getInitialBricks = () => {
        let bricks = [];
        for (var r = 0; r < Brick.rowCount; r++) {
            bricks[r] = new Brick();
        }

        return bricks;
    }
}
