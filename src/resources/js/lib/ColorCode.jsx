import { Vector } from "./Vector";

export class ColorCode {
    /**
     * @type {string}
     */
    static skyBlue = "#0095DD";
    /**
     * @type {string}
     */
    static dimGray = "#696969";
    /**
     * @type {string}
     */
    static darkRed = "#d21515";
    /**
     * @type {string}
     */
    static silver = "#a0a0a0";
    /**
     * @type {string}
     */
    static red = "#ff0000";
    /**
     * @type {string}
     */
    static mediumSeaGreen = "#3cb371";

    /**
     * @type {string}
     */
    code;

    /**
     * @param {string} code
     */
    constructor(code) {
        this.code = code;
    }

    /**
     * @returns {ColorCode}
     */
    getDarkerRed = () => {
        return new ColorCode(
            "#"
            + Math.round((9 * parseInt((this.code).substring(1, 3), 16)) / 10).toString(16)
            + (this.code).substring(3, 7)
        );
    }
}
