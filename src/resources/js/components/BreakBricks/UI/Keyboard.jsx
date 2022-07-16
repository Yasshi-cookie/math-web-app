export class Keyboard {
    /**
     * @param {boolean} rightPressed
     * @param {boolean} leftPressed
     */
    constructor(
        rightPressed = false,
        leftPressed = false
    ) {
        this.rightPressed = rightPressed;
        this.leftPressed = leftPressed;
    }

    /**
     * keyとtypeからrightPressedを更新する
     * @param {string} key キー
     * @param {string} type keydown/keyup
     */
    setRightPressed = (key, type) => {
        if ((key === 'Right' || key === 'ArrowRight') && type === 'keydown') {
            this.rightPressed = true;
        }
        if ((key === 'Right' || key === 'ArrowRight') && type === 'keyup') {
            this.rightPressed = false;
        }
    };

    /**
     * keyとtypeからleftPressedを更新する
     * @param {string} key キー
     * @param {string} type keydown/keyup
     */
    setleftPressed = (key, type) => {
        if ((key === 'Left' || key === 'ArrowLeft') && type === 'keydown') {
            this.leftPressed = true;
        }
        if ((key === 'Left' || key === 'ArrowLeft') && type === 'keyup') {
            this.leftPressed = false;
        }
    };
}
