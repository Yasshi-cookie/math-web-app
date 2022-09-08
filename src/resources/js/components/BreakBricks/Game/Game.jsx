import { Canvas } from "../../../lib/Canvas";
import { Vector } from "../../../lib/Vector";
import { Ball } from "../Ball";
import { BossBrick } from "../BossBrick";
import { Brick } from "../Brick";
import { BricksDirectProduct } from "../BricksDirectProduct";
import { CollisionDetectBallAndRectangle } from "../CollisionDetects/CollisionDetectBallAndRectangle";
import { RotatePlanes } from "../Gimmicks/RotatePlanes";
import { Paddle } from "../Paddle";
import { Keyboard } from "../UI/KeyBoard";
import { PaddleHandler } from "./PaddleHandler";

/**
 * ゲームの進行（各要素の状態管理）を担当する
 */
export class Game {
    static initialScore = 0;

    canvas;
    ball;
    paddle;
    rotatePlanes;
    bricksDirectProduct;
    bossBrick;
    score = Game.initialScore;
    keyboard;

    /**
     * @param {Canvas} canvas
     * @param {Ball} ball
     * @param {Paddle} paddle
     * @param {RotatePlanes} rotatePlanes
     * @param {BricksDirectProduct} bricksDirectProduct
     * @param {BossBrick} bossBrick
     * @param {number} score
     * @param {Keyboard} keyboard
     */
    constructor(
        canvas,
        ball,
        paddle,
        rotatePlanes,
        bricksDirectProduct,
        bossBrick,
        score = Game.initialScore,
        keyboard
    ) {
        this.canvas = canvas;
        this.ball = ball;
        this.paddle = paddle;
        this.rotatePlanes = rotatePlanes;
        this.bricksDirectProduct = bricksDirectProduct;
        this.bossBrick = bossBrick;
        this.score = score;
        this.keyboard = keyboard;
    }

    /**
     * Canvasからインスタンスを取得する
     * @param {Canvas} canvas
     * @returns {Game}
     */
    static newInitialInstanceByCanvas = (canvas) => {
        return new Game(
            canvas,
            Ball.newInitialInstanceByCanvas(canvas),
            Paddle.newInitialInstanceByCanvas(canvas),
            new RotatePlanes(),
            new BricksDirectProduct(),
            new BossBrick(),
            Game.initialScore,
            new Keyboard()
        );
    }

    /**
     * 次の描画のための準備をする
     */
    prepareForNextDraw = () => {
        // 衝突判定
        this.collisionDetect();
        // 勝利の表示
        this.showWin();
        // 各ゲーム要素の更新処理
        this.update();
    }

    /**
     * 描画毎のゲームの状態を更新
     */
    update = () => {
        // パドル位置の更新処理
        var paddleHandler = new PaddleHandler(this.keyboard, this.paddle);
        paddleHandler.updatePaddleX(this.canvas.width);

        // ボール位置の更新
        this.ball.position = Vector.add(this.ball.position, this.ball.velocity);

        // ボールの速度を更新
        this.ball.updateVelocityWhenCollideSide(this.canvas.width);
        this.ball.updateVelocityWhenCollideTop();

        // パドルがボールを打ち返したかどうか判定
        const collisionDetectBallAndPaddle = new CollisionDetectBallAndRectangle(this.ball, this.paddle.shape);
        if (collisionDetectBallAndPaddle.doseDetect()) {
            collisionDetectBallAndPaddle.updateBallVelocityWhenCollideRectangle();
        }

        // ボールを返すのに失敗した場合はライフが減るかGameOverになる
        if (this.#failForPaddleToHitBall()) {
            this.#damageToPaddle();
        }
    }

    /**
     * キーボード操作イベントをセット
     */
    setKeyboardEventListener = () => {
        document.addEventListener("keydown", (e) => this.keyEventHandler(e), false);
        document.addEventListener("keyup", (e) => this.keyEventHandler(e), false);
    }

    resetWhenLifeDecrease = () => {
        this.ball.setInitialPosition(this.canvas);
        this.ball.setInitialVelocity();
        this.paddle.setInitialShapeCoordinateByCanvasWidth(this.canvas.width);
    }

    keyEventHandler = (e) => {
        this.keyboard.setRightPressed(e.key, e.type);
        this.keyboard.setleftPressed(e.key, e.type);
    }

    isWin = () => {
        let allDisplayFlg = false;
        for(var c = 0; c < Brick.columnCount; c++) {
            for(var r = 0; r < Brick.rowCount; r++) {
                allDisplayFlg = allDisplayFlg || this.bricksDirectProduct.getBrickByRowCol(r, c).display_flg;
            }
        }

        return !allDisplayFlg;
    }

    showWin = () => {
        if (this.isWin()) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            clearInterval(interval);
        }
    }

    collisionDetect = () => {
        this.collisionDetectBetweenBallAndBricks();
        this.collisionDetectBetweenBallAndBossBrick();
    }

    collisionDetectBetweenBallAndBricks = () => {
        for (let c = 0; c < Brick.columnCount; c++) {
            for (let r = 0; r < Brick.rowCount; r++) {
                let brick = this.bricksDirectProduct.getBrickByRowCol(r, c);
                if (!brick.display_flg) {
                    continue;
                }

                const collisionDetectBallAndBrick = new CollisionDetectBallAndRectangle(this.ball, brick.shape);

                if (collisionDetectBallAndBrick.doseDetect()) {
                    brick.display_flg = false;
                    this.score++;
                    collisionDetectBallAndBrick.updateBallVelocityWhenCollideRectangle();
                    // 速さを更新
                    this.ball.velocity = Vector.add(this.ball.velocity, Vector.scalar(0.5, new Vector(Math.sign(this.ball.velocity.x), Math.sign(this.ball.velocity.y))))
                }
            }
        }
    }

    collisionDetectBetweenBallAndBossBrick = () => {
        let bossBrick = this.bossBrick;
        if (!bossBrick.display_flg) {
            return;
        }

        const collisionDetectBallAndBrick = new CollisionDetectBallAndRectangle(this.ball, bossBrick.shape);

        if (collisionDetectBallAndBrick.doseDetect()) {
            bossBrick.lives.decrease(1);

            if (bossBrick.lives.isDead()) {
                bossBrick.display_flg = false;
                this.score += 10;
            }

            collisionDetectBallAndBrick.updateBallVelocityWhenCollideRectangle();
            // 速さを更新
            this.ball.velocity = Vector.add(this.ball.velocity, Vector.scalar(0.1, new Vector(Math.sign(this.ball.velocity.x), Math.sign(this.ball.velocity.y))))
        }
    }

    #damageToPaddle = () => {
        this.paddle.lives.decrease(1);
        if (this.paddle.lives.isAlive()) {
            // ライフがまだある場合
            this.resetWhenLifeDecrease();
        } else {
            // ライフが無い場合
            this.#gameOver();
        }
    }

    /**
     * @returns {boolean}
     */
    #isBallBottom = () => {
        return this.ball.position.y + this.ball.velocity.y + this.ball.radius > this.canvas.height
    }

    /**
     * @returns {boolean}
     */
    #failForPaddleToHitBall = () => {
        return (
            this.#isBallBottom()
            && !this.#isBallBetweenPaddle()
        )
    }

    /**
     * @returns {boolean}
     */
    #isBallBetweenPaddle = () => {
        return (
            this.ball.position.x > this.paddle.shape.coordinate.x
            && this.ball.position.x < this.paddle.shape.coordinate.x + this.paddle.shape.width
        );
    }

    #gameOver = () => {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
        return;
    }
}
