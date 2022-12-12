import { Vector } from "../Vector";

/**
 * 2 * 2 の正方行列
 */
export class Matrix {
    /**
     * @param {Vector} vector_1
     * @param {Vector} vector_2
     */
    constructor(vector_1, vector_2) {
        this.vector_1 = vector_1;
        this.vector_2 = vector_2;

        this.setRowVector();
    }

    /**
     * 行ベクトルから行列を生成
     *
     * @param {Vector} row_vector1
     * @param {Vector} row_vector2
     * @returns {Matrix}
     */
    static newInstanceByRowVector = (row_vector1, row_vector2) => {
        const vector_1 = new Vector(row_vector1.x, row_vector2.x);
        const vector_2 = new Vector(row_vector1.y, row_vector2.y);
        return new Matrix(vector_1, vector_2);
    }

    /**
     * 行列とベクトルの積を返す
     *
     * @param {Matrix} matrix
     * @param {Vector} vector
     * @returns {Vector}
     */
    static productMatrixVector = (matrix, vector) => {
        return new Vector(
            Vector.innerProduct(matrix.row_vector_1, vector),
            Vector.innerProduct(matrix.row_vector_2, vector)
        )
    }

    static reflectionByXAxis = () => {
        return new Matrix(
            new Vector(1, 0),
            new Vector(0, -1)
        );
    }

    static reflectionByYAxis = () => {
        return new Matrix(
            new Vector(-1, 0),
            new Vector(0, 1)
        );
    }

    setRowVector = () => {
        this.row_vector_1 = new Vector(this.vector_1.x, this.vector_2.x);
        this.row_vector_2 = new Vector(this.vector_1.y, this.vector_2.y);
    }
}
