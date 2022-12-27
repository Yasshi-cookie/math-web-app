import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Input, TextField } from '@mui/material';

import "../../css/app.css"

/**
 * 初期値
 */
// あみだくじの横線の数
const initialLineNumber = 6;
// あみだくじの縦線の数
const initialColNumber = 4;

const getInitialAmidas = () => {
    let amidasArray = [];
    for (let i = 0; i <= initialLineNumber - 1; i++) {
        amidasArray[i] = [];
        for (let j = 0; j <= initialColNumber - 2; j++) {
            amidasArray[i][j] = false;
        }
    }
    return amidasArray;
}

const getInitialInputsOutputs = () => {
    let tmp = [];
    for (let i = 0; i < initialColNumber; i++) {
        tmp[i] = i;
    }

    return tmp;
}

const getInitialResults = () => {
    let tmp = new Object();
    for (let i = 1; i <= initialColNumber; i++) {
        tmp[i] = i;
    }

    return tmp;
}

// TODO: UIの整理
const Amidakuji = () => {
    /**
     * あみだくじの本数
     */
    const [colNumber, setColNumber] = useState(initialColNumber);
    /**
     * あみだくじ
     */
    const [amidas, setAmidas] = useState(getInitialAmidas);
    /**
     * 入力
     */
    const [inputs, setInputs] = useState(getInitialInputsOutputs);
    /**
     * 出力
     */
    const [outputs, setOutputs] = useState(getInitialInputsOutputs);
    /**
     * シュッフルされた出力
     */
    const [shuffledOutputs, setShuffledOutputs] = useState(getInitialInputsOutputs);
    /**
     * 入力と出力の対応付け
     */
    const [results, setResults] = useState(getInitialResults);
    /**
     * 結果を表示するかどうか
     */
    const [resultShowFlg, setResultShowFlg] = useState(false);
    /**
     * 出力結果をシャッフルするかどうか
     */
    const [whetherShuffle, setWhetherShuffle] = useState(true)

    useEffect(() => {
        updateResult();
    },[])

    const onClickLine = (line, col) => {
        let newAmidas = [...amidas];
        if (newAmidas[line][col]) {
            newAmidas[line][col] = false;
            setAmidas(newAmidas);
        } else {
            const tmpAmidas = newAmidas[line];
            const previous = col - 1;
            const next = col + 1;
            const previousCompareFlg = (previous >= 0);
            const nextCompareFlg = (next <= newAmidas[line].length - 1);
            const previousActiveFlg = previousCompareFlg ? tmpAmidas[previous] : false;
            const nextActiveFlg = nextCompareFlg ? tmpAmidas[next] : false;
            if (!previousActiveFlg && !nextActiveFlg) {
                newAmidas[line][col] = true;
                setAmidas(newAmidas);
            }
        }
        console.log({amidas});

        updateResult();
    }

    const getClassNameByActiveFlg = (activeFlg) => {
        return activeFlg ? "crossed" : "";
    }

    const updateResult = () => {
        axios
            .post('api/symmetric-group', {
                amidas: amidas,
            })
            .then(response => {
                setResults(response.data.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    const updateAmidas = (difference) => {
        let absoluteDifference = Math.abs(difference);

        if (difference > 0) {
            amidas.map((amida) => {
                for (let i = 1; i <= absoluteDifference; i++) {
                    amida.push(false);
                }
            });
        } else if (difference < 0) {
            amidas.map((amida) => {
                for (let i = 1; i <= absoluteDifference; i++) {
                    amida.pop();
                }
            });
        }

        setAmidas(amidas);
    }

    const updateInputsNumber = (difference) => {
        let absoluteDifference = Math.abs(difference);

        if (difference > 0) {
            for (let i = 1; i <= absoluteDifference; i++) {
                inputs.push(inputs.length);
            }
        } else if (difference < 0) {
            for (let i = 1; i <= absoluteDifference; i++) {
                inputs.pop();
            }
        }

        setInputs(inputs);
    }

    const updateOutputsNumber = (difference) => {
        let absoluteDifference = Math.abs(difference);

        if (difference > 0) {
            for (let i = 1; i <= absoluteDifference; i++) {
                outputs.push(outputs.length);
            }
        } else if (difference < 0) {
            for (let i = 1; i <= absoluteDifference; i++) {
                outputs.pop();
            }
        }

        setOutputs(outputs);
    }

    const onClickUpdateButton = () => {
        let newAmidasColLength = document.querySelector("input[id=input-col-number]").value - 1;
        // くじの本数を更新
        setColNumber(newAmidasColLength + 1);

        let amidasColLength = amidas[0].length;
        let difference = newAmidasColLength - amidasColLength;
        // あみだくじを更新
        updateAmidas(difference)
        // 入出力を更新
        updateInputsNumber(difference);
        updateOutputsNumber(difference);
        // 結果を更新
        updateResult();
    }

    const onClickResetButton = () => {
        setAmidas(getInitialAmidas());
        setColNumber(initialColNumber);
        document.getElementById('input-col-number').value = initialColNumber;
        updateInputsNumber(initialColNumber - inputs.length);
        updateOutputsNumber(initialColNumber - outputs.length);
        setResults(getInitialResults());
    }

    const onClickResetLineButton = () => {
        setAmidas(getInitialLineAmidas);
        setResults(getInitialResults());
    }

    const onChangeInputInputsTextField = (e, index) => {
        inputs[index] = e.target.value;
        setInputs(inputs);
        updateResult();
    }

    const onChangeInputOutputsTextField = (e, index) => {
        outputs[index] = e.target.value;
        setOutputs(outputs);
        updateResult();
    }

    const getInitialLineAmidas = () => {
        let amidasArray = [];
        for (let i = 0; i <= amidas.length - 1; i++) {
            amidasArray[i] = [];
            for (let j = 0; j <= amidas[0].length - 1; j++) {
                amidasArray[i][j] = false;
            }
        }
        return amidasArray;
    }

    const shuffleOutputs = () => {
        for (let i = outputs.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [outputs[i], outputs[j]] = [outputs[j], outputs[i]];
        }

        setShuffledOutputs(outputs);
    }

    const showResults = () => {
        // if (whetherShuffle) {
        //     shuffleOutputs();
        // }
        setResultShowFlg(true);
    }

    const onClickWhetherShuffleCheckBox = (e) => {
        setWhetherShuffle(e.target.checked);
    }

    return (
        <div>
            <div id="inputs-amida-col">
                <div className='input-box'>
                    {/* TODO: TextField type="number" に変更してValidationを適用する */}
                    くじの本数：<Input id='input-col-number' type="number" max="10" min="2" defaultValue={initialColNumber}/>
                </div>
                <div className="update-button">
                    <Button id="update-button" color="primary" variant="contained" onClick={onClickUpdateButton}>更新</Button>
                </div>
                <div className="reset-line-button">
                    <Button id="reset-line-button" variant="contained" onClick={onClickResetLineButton}>横線をリセット</Button>
                </div>
                <div className="reset-button">
                    <Button id="reset-button" variant="contained" onClick={onClickResetButton}>リセット</Button>
                </div>
            </div>

            {/* あみだくじ */}
            <div className="amidas" style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                {/* 入力部分 */}
                <ul className='inputs-line-for-display'>
                    {inputs.map((input, col) => {
                        return (
                            <li key={"input-" + col} className="inputs-for-display">
                                <TextField onChange={(e) => {onChangeInputInputsTextField(e, col)}} className="list-inputs" label={"参加者" + (col + 1)} variant="outlined" size="small" sx={{width: (1 / inputs.length) * 300 + "%"}}/>
                            </li>
                        )
                    })}
                </ul>
                {/*　本体 */}
                <div className='amida-body'>
                    {amidas.map((amida, line) => {
                        return (
                            <ul key={"line-" + line} className="amida-line">
                                {amida.map((boolean, col) => {
                                    return (
                                        (line !== amidas.length - 1)
                                            ? <li key={"col-" + col} className={"amida-row " + getClassNameByActiveFlg(boolean)} onClick={() => onClickLine(line, col)}></li>
                                            // 最後の行は横線を出力しない
                                            : <li key={"col-" + col} className="amida-row"></li>
                                    )
                                })}
                                <li className="amida-row"></li>
                            </ul>
                        )
                    })}
                </div>
                {/* 出力部分 */}
                <ul className="outputs-line-for-display">
                    {outputs.map((output, col) => {
                        return (
                            <li key={"output-" + col} className="outputs-for-display">
                                <TextField onChange={(e) => {onChangeInputOutputsTextField(e, col)}} className="list-outputs" label={"賞品" + (col + 1)} variant="outlined" size="small" sx={{width: (1 / outputs.length) * 300 + "%"}} />
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="show-result-button">
                {/* <FormControlLabel id='whether-shuffle' control={<Checkbox id='whether-shuffle-checkbox' defaultChecked onClick={onClickWhetherShuffleCheckBox} />} label="出力をシャッフルする"></FormControlLabel> */}
                <Button id='show-result-button' color='secondary' variant="contained" onClick={showResults}>結果を見る</Button>
                <Button id='hide-result-button' color='secondary' variant="contained" onClick={() => {setResultShowFlg(false)}}>結果を隠す</Button>
            </div>

            <ul className="results">
                {(results !== undefined && resultShowFlg) && Object.keys(results).map((key) => {
                    return (
                        <li key={"result-" + key}>{(inputs[key - 1]) + ' => ' + outputs[results[key] - 1]}</li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Amidakuji;
