import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';

import s from './App.module.css';
import WebcamBlock from './components/webcam/Webcam';
import { AddCalledStart, AddCalledStop, CalledType } from './state/statisticReducer';
import { useAppSelector } from './state/store';
import { changePlaying } from './state/webcamReducer';

const App: FC = () => {
    const dispatch = useDispatch();
    const playing = useAppSelector<boolean>(state => state.webcam.playing);
    const called = useAppSelector<CalledType[]>(state => state.statistic.called);
    const [date, setDate] = useState<Date>();
    const [lastDate, setLastDate] = useState<Date>();

    const newDate = date?.toLocaleDateString();
    const newTime = date?.toLocaleTimeString();
    const startStopPlay = (): void => {
        dispatch(changePlaying());
        if (!playing) {
            const x = new Date();
            setDate(x);
            const newDateX = x.toLocaleDateString();
            const newTimeX = x.toLocaleTimeString();
            dispatch(AddCalledStart(newDateX, newTimeX));
        } else {
            const x = new Date();
            const newTimeX = x.toLocaleTimeString();
            setLastDate(new Date());
            dispatch(AddCalledStop(newTimeX));
        }
    };

    // const x = new Date(called[0].stop).getTime(); // мм сек
    const data = called.map(m => (
        <div className={s.statistic} key={m.id}>
            <span>data:{m.data}</span>
            <span>time:{m.start}</span>
            <span>last data:{m.stop}</span>
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
            <div className={s.statistic}>
                <span>data:{newDate}</span>
                <span>time:{newTime}</span>
                <span>last data:{lastDate?.toLocaleTimeString()}</span>
            </div>

            <span>среднее значение:</span>
            <span>сумма:</span>
            {data}
        </div>
    );
};

export default App;
