import "../../css/break_bricks.css";
import { Canvas } from "../lib/Canvas";
import { Draw } from "./BreakBricks/Draw/Draw";
import { Game } from "./BreakBricks/Game/Game";

const BreakBricks = () => {
    return (
        <div>
            <title>シューティングゲーム</title>
            <canvas id="myCanvas" width={480} height={440}></canvas>
        </div>
    )
}

// TODO:
// ①オブジェクト指向チックにリファクタリングする
//      （完了）UI(KeyBoardEvent)Classの作成
//      （完了）Game Classの作成 進行を担当する。
//      （完了）Draw Classの作成 ゲームの描画を担当する。
// ②（完了）当たり判定を厳密にする
// ③ゲームにボスを追加する
// ④ギミックを追加する
//      1. 回転平面：長方形の別の特徴づけを与える。
//          例えば、左上隅の点の座標、右上隅の点の座標、法線ベクトルをプロパティとして与える
//      2.プロパティ修正後、rectangleの呼び出し元のロジック等を修正する
// ⑤アイテムを追加する
// ⑥不具合修正：最後のBrickが消える前に勝利通知が表示される。
//      エネミーのdisplay_flgを更新 → draw() → 勝利通知 の順番にする
// ⑦周期関数を使った動きを試す
document.addEventListener('DOMContentLoaded', () => {
    const canvasHtmlElement = document.getElementById("myCanvas");
    let cRCtxt2D = canvasHtmlElement.getContext("2d");
    let canvas = new Canvas(canvasHtmlElement.width, canvasHtmlElement.height);

    let game = Game.newInitialInstanceByCanvas(canvas);
    game.setKeyboardEventListener();

    const gameRender = () => {
        game.prepareForNextDraw();
        // 描画処理
        let drawObject = new Draw(game, canvas, cRCtxt2D);
        // 前のコマの描画をクリアする
        drawObject.crear();
        // 描画
        drawObject.draw();


        // 次のフレームをセット
        requestAnimationFrame(gameRender);
    }

    var interval = gameRender();
});

export default BreakBricks
