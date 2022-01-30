import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import s from 'App.module.css';
import Statistic from 'components/statistic/Statistic';
import WebcamBlock from 'components/webcam/Webcam';
import { AddCalledStart, AddCalledStop } from 'state/statisticReducer';
import { useAppSelector } from 'state/store';
import { changePlaying } from 'state/webcamReducer';

const App: FC = () => {
    const dispatch = useDispatch();

    const playing = useAppSelector<boolean>(state => state.webcam.playing);

    const startStopPlay = (): void => {
        dispatch(changePlaying());
        const newTime = Date.now(); // data format UTC
        if (!playing) {
            dispatch(AddCalledStart(newTime));
        } else {
            dispatch(AddCalledStop(newTime));
        }
    };

    return (
        <div className={s.wrapper}>
            <WebcamBlock />
            <button type="button" className={s.button} onClick={startStopPlay}>
                {playing ? 'Stop' : 'Start'}
            </button>
            <Statistic />
        </div>
    );
};

export default App;
