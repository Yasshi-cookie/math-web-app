import { Brick } from "./Brick";
import { Bricks } from "./Bricks";

export class BricksDirectProduct {
    /**
     * @param {Array<Bricks>} items
     */
    constructor(
        items = BricksDirectProduct.getInitialBricksDirectProduct()
    ) {
        this.items = items;
        this.setInitialBricksCoordinate();
    }

    /**
     * row行col列のbrickを取得する
     *
     * @param {number} row 行番号
     * @param {number} col 列番号
     * @returns {Brick}
     */
    getBrickByRowCol = (row, col) => {
        return this.items[col].bricks[row];
    }

    setInitialBricksCoordinate = () => {
        for(var c = 0; c < Brick.columnCount; c++) {
            for(var r = 0; r < Brick.rowCount; r++) {
                this.#setInitialBrickCoordinate(r, c);
            }
        }
    }

    /**
     * @returns {Array<Bricks>}
     */
    static getInitialBricksDirectProduct = () => {
        var bricksDirectProduct = [];
        for (var c = 0; c < Brick.columnCount; c++) {
            bricksDirectProduct[c] = new Bricks();
        }

        return bricksDirectProduct;
    }

    /**
     * @param {number} row
     * @param {number} col
     */
    #setInitialBrickCoordinate = (row, col) => {
        this.getBrickByRowCol(row, col).setInitialCoordinate(row, col)
    }
}
