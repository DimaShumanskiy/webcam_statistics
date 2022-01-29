import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import s from './App.module.css';
import WebcamBlock from './components/webcam/Webcam';
import { AddCalledStart, AddCalledStop, CalledType } from './state/statisticReducer';
import { useAppSelector } from './state/store';
import { changePlaying } from './state/webcamReducer';
import { Four, Zero } from './staticNumber';

const App: FC = () => {
    const dispatch = useDispatch();

    const playing = useAppSelector<boolean>(state => state.webcam.playing);
    const called = useAppSelector<CalledType[]>(state => state.statistic.called);

    const startStopPlay = (): void => {
        dispatch(changePlaying());
        const newTime = Date.now();

        if (!playing) {
            dispatch(AddCalledStart(newTime, newTime));
        } else {
            dispatch(AddCalledStop(newTime));
        }
    };
    const onClickHandler = (): void => {};

    const sum = called.reduce(
        (acc, m) => (m.stop && m.start ? m.stop - m.start : Zero) + acc,
        Zero,
    );
    const middle = sum / called.length;

    const data = called.map(m => (
        <div className={s.statistic} key={m.id}>
            <span>data:{new Date(m.data || Zero).toLocaleDateString()}</span>
            <span>time: {new Date(m.start || Zero).toLocaleTimeString()}</span>
            {m.stop ? (
                <span>last data:{new Date(m.stop || Zero).toLocaleTimeString()}</span>
            ) : (
                <span>что то</span>
            )}
            <span>
                duration:
                {new Date(m.stop && m.start ? m.stop - m.start : Zero)
                    .toLocaleTimeString('ru-RU', {
                        timeZone: 'UTC',
                        timeZoneName: 'short',
                    })
                    .slice(Zero, -Four)}
            </span>
            <button type="button" className={s.btn} onClick={onClickHandler}>
                DELETE
            </button>
        </div>
    ));

    return (
        <div className={s.App}>
            <div className={s.container} />
            <WebcamBlock />
            <div className={s.input}>
                <button type="button" className={s.btn} onClick={startStopPlay}>
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>
            {data}
            <span>
                среднее:
                {new Date(middle)
                    .toLocaleTimeString('ru-RU', {
                        timeZone: 'UTC',
                        timeZoneName: 'short',
                    })
                    .slice(Zero, -Four)}
            </span>
            <span>
                сумма:
                {new Date(sum)
                    .toLocaleTimeString('ru-RU', {
                        timeZone: 'UTC',
                        timeZoneName: 'short',
                    })
                    .slice(Zero, -Four)}
            </span>
        </div>
    );
};

export default App;
