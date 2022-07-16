import { Paddle } from "../Paddle";
import { Keyboard } from "../UI/KeyBoard";

export class PaddleHandler {
    /**
     * @param {Keyboard} keyboard
     * @param {Paddle} paddle
     */
    constructor(
        keyboard,
        paddle
    ) {
        this.keyboard = keyboard;
        this.paddle = paddle;
    }

    updatePaddleX = (canvasWidth) => {
        if(this.keyboard.rightPressed && this.paddle.shape.coordinate.x < canvasWidth - this.paddle.shape.width) {
            this.paddle.shape.coordinate.x += 7;
        }
        else if(this.keyboard.leftPressed && this.paddle.shape.coordinate.x > 0) {
            this.paddle.shape.coordinate.x -= 7;
        }
    }
}
