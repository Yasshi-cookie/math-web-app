/**
 * 2次元ベクトル空間
 */
export class Vector {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * ベクトルのノルムを返す
     * @returns {number}
     */
    norm = () => {
        return Math.sqrt((this.x ** 2) + (this.y ** 2));
    }

    isInDomainXPlusYPlus = () => {
        return (this.x >= 0 && this.y >= 0);
    }

    isInDomainXPlusYMinus = () => {
        return (this.x >= 0 && this.y <= 0);
    }

    isInDomainXMinusYPlus = () => {
        return (this.x <= 0 && this.y >= 0);
    }

    isInDomainXMinusYMinus = () => {
        return (this.x <= 0 && this.y <= 0);
    }

    /**
     * @param {Vector} vector_a
     * @param {Vector} vector_b
     * @returns {number}
     */
    static distance = (vector_a, vector_b) => {
        return Vector.sub(vector_a, vector_b).norm();
    }

    /**
     * @param {Vector} vector_a
     * @param {Vector} vector_b
     * @returns {boolean}
     */
    static equal = (vector_a, vector_b) => {
        return (vector_a.x === vector_b.x) && (vector_a.y === vector_b.y);
    }

    /**
     * vector_a と vector_bの和を返す
     *
     * @param {Vector} vector_a
     * @param {Vector} vector_b
     * @returns {Vector}
     */
    static add(vector_a, vector_b) {
        return new Vector(vector_a.x + vector_b.x, vector_a.y + vector_b.y);
    }

    static sub(vector_a, vector_b) {
        return Vector.add(vector_a, Vector.scalar(-1, vector_b));
    }

    /**
     * scalar と vectorの積を返す
     *
     * @param {number} scalar
     * @param {Vector} vector
     * @returns
     */
    static scalar(scalar, vector) {
        return new Vector(scalar * vector.x, scalar * vector.y);
    }

    /**
     *
     * @param {Vector} vector_a
     * @param {Vector} vector_b
     * @returns {number}
     */
    static innerProduct(vector_a, vector_b) {
        return vector_a.x * vector_b.x + vector_a.y * vector_b.y
    }
}
