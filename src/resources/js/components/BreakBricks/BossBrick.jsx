import { Rectangle } from "../../lib/Shapes/Rectangle";
import { Vector } from "../../lib/Vector";
import { Brick } from "./Brick";
import { Lives } from "./Lives";

/**
 * ブロックのボス敵
 */
export class BossBrick extends Brick {
    static initialLives = new Lives(3);

    /**
     * ライフ
     * @type {Lives}
     */
    lives;

    /**
     * @param {Rectangle} shape
     * @param {boolean} display_flg
     */
    constructor(
        shape = new Rectangle(new Vector(200, 20), 75, 20),
        display_flg = true,
        lives = BossBrick.initialLives
    ) {
        super(shape, display_flg);
        this.lives = lives;
    }
}
