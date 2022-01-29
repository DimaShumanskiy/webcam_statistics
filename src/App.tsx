import React from 'react';

import './App.css';
import { useDispatch } from 'react-redux';

import WebcamBlock from './components/webcam/Webcam';
import { useAppSelector } from './state/store';
import { changePlaying } from './state/webcamReducer';

const App = (): any => {
    const dispatch = useDispatch();
    const playing = useAppSelector<boolean>(state => state.webcam.playing);

    const startStopPlay = (): any => {
        dispatch(changePlaying());
    };

    return (
        <div className="App">
            <div className="container" />
            <WebcamBlock />
            <div className="input">
                <button type="button" className="btn" onClick={startStopPlay}>
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    );
};

export default App;
