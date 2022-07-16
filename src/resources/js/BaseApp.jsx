import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import BaseRouter from './components/BaseRouter';

/**
 * TODO:
 * ①Laravel * React だと自動コンパイルされないか聞いてみる。
 * （npm run watch で変更されると自動でコンパイルするようになっているが、webページをレンダリングする必要がある）
 * ②EC2かECSにデプロイする
 */
ReactDOM.render(
    <BrowserRouter>
        <div className="App">
            <h1>おもちゃ箱</h1>
            <ul>
                <li>
                    <Link to={"/"}>ホーム</Link>
                </li>
                <li>
                    <Link to={"amidakuji"}>あみだくじ</Link>
                </li>
            </ul>
            <BaseRouter />
        </div>
    </BrowserRouter>,
    document.getElementById('app')
);
