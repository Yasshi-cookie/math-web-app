export class Canvas {
    /**
     * @var {number}
     */
    width;

    /**
     * @var {number}
     */
    height;

    static defaultWidth = 480;
    static defaultHeight = 440;

    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(
        width,
        height
    ) {
        this.width = width;
        this.height = height;
    }
}
