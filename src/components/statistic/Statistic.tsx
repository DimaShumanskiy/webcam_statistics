import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import { CalledType, RemoveItemCalled } from '../../state/statisticReducer';
import { useAppSelector } from '../../state/store';
import { Four, Zero } from '../../staticNumber';

import s from './Statistic.module.css';

const Statistic: FC = () => {
    const dispatch = useDispatch();
    const called = useAppSelector<CalledType[]>(state => state.statistic.called);

    const amountOfTime = called.reduce(
        (acc, m) => (m.stop && m.start ? m.stop - m.start : Zero) + acc,
        Zero,
    );
    const middle = amountOfTime / called.length;

    const onClickHandler = (id: string): void => {
        dispatch(RemoveItemCalled(id));
    };

    const statistic = called.map(m => (
        <div className={s.statistic} key={m.id}>
            <span className={s.statisticItem}>
                {new Date(m.data || Zero).toLocaleDateString()}
            </span>

            <span className={s.statisticItem}>
                {new Date(m.start || Zero).toLocaleTimeString()}
            </span>

            {m.stop ? (
                <span className={s.statisticItem}>
                    {new Date(m.stop || Zero).toLocaleTimeString()}
                </span>
            ) : (
                <span className={s.statisticItem} />
            )}

            {m.stop ? (
                <span className={s.statisticItem}>
                    {new Date(m.stop && m.start ? m.stop - m.start : Zero)
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

    const mean = middle ? (
        <span>
            {new Date(middle)
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
                <span className={s.headerItem}>start time</span>
                <span className={s.headerItem}>end time</span>
                <span className={s.headerItem}>duration</span>
            </div>
            {statistic}
            <div className={s.generalStatistics}>
                <p className={s.generalStatistics_item}>Mean: {mean}</p>
                <p className={s.generalStatistics_item}>Sum: {sum}</p>
            </div>
        </>
    );
};

export default Statistic;
