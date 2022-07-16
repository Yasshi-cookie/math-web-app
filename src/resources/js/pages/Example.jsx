import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';

export const Example = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">テストヘッダー</div>

                        <div className="card-body">pages配下に移動完了</div>
                        {/* ボタンを追記 */}
                        <Button color="secondary" variant="contained" href={`/`}>Homeに遷移ボタン</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

// if (document.getElementById('app')) {
//     ReactDOM.render(<Example />, document.getElementById('app'));
// }
