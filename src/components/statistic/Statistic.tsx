import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import s from './Statistic.module.css';

import { CalledType, RemoveItemCalled } from 'state/statisticReducer';
import { useAppSelector } from 'state/store';
import { Four, Zero } from 'staticNumber';

const Statistic: FC = () => {
    const dispatch = useDispatch();
    const calls = useAppSelector<CalledType[]>(state => state.statistic.calls);

    // get the sum of the video duration
    const amountOfTime = calls.reduce((acc, call) => {
        const timeForCall =
            call.timeStop && call.timeStart ? call.timeStop - call.timeStart : Zero;
        return timeForCall + acc;
    }, Zero);

    // get mean time
    const timeAverage = amountOfTime / calls.length;

    const onClickHandler = (id: string): void => {
        dispatch(RemoveItemCalled(id));
    };
    // time statistics from redux
    const statistic = calls.map(m => (
        <div className={s.statistic} key={m.id}>
            <span className={s.statisticItem}>
                {new Date(m.timeStart || Zero).toLocaleDateString()}
            </span>

            <span className={s.statisticItem}>
                {new Date(m.timeStart || Zero).toLocaleTimeString()}
            </span>

            {m.timeStop ? (
                <span className={s.statisticItem}>
                    {new Date(m.timeStop || Zero).toLocaleTimeString()}
                </span>
            ) : (
                <span className={s.statisticItem} />
            )}

            {m.timeStop ? (
                <span className={s.statisticItem}>
                    {new Date(m.timeStop && m.timeStart ? m.timeStop - m.timeStart : Zero)
                        .toLocaleTimeString('ru-RU', {
                            timeZone: 'UTC',
                            timeZoneName: 'short',
                        })
                        .slice(Zero, -Four)}
                    <button
                        type="button"
                        className={s.button}
                        onClick={() => onClickHandler(m.id)}
                    >
                        X
                    </button>
                </span>
            ) : (
                <span className={s.statisticItem} />
            )}
        </div>
    ));

    const mean = timeAverage ? (
        <span>
            {new Date(timeAverage)
                .toLocaleTimeString('ru-RU', {
                    timeZone: 'UTC',
                    timeZoneName: 'short',
                })
                .slice(Zero, -Four)}
        </span>
    ) : (
        '0.00.00'
    );

    const sum = amountOfTime ? (
        <span>
            {new Date(amountOfTime)
                .toLocaleTimeString('ru-RU', {
                    timeZone: 'UTC',
                    timeZoneName: 'short',
                })
                .slice(Zero, -Four)}
        </span>
    ) : (
        '0.00.00'
    );

    return (
        <>
            <span className={s.title}>Webcam call statistics</span>
            <div className={s.header}>
                <span className={s.headerItem}>data</span>
                <span className={s.headerItem}>call start</span>
                <span className={s.headerItem}>end of call</span>
                <span className={s.headerItem}>call duration</span>
            </div>
            {statistic}
            <div className={s.generalStatistics}>
                <p className={s.generalStatistics_item}>Average call duration: {mean}</p>
                <p className={s.generalStatistics_item}>Total talk time: {sum}</p>
            </div>
        </>
    );
};

export default Statistic;
