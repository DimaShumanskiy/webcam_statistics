import React, { useRef } from 'react';

import Webcam from 'react-webcam';

import { useAppSelector } from '../../state/store';

import s from './Webcam.module.css';

const WebcamBlock = (): any => {
    const webcamRef = useRef(null);
    const playing = useAppSelector<boolean>(state => state.webcam.playing);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user',
    };

    return (
        <div className={s.container}>
            {playing ? (
                <Webcam
                    className={s.webcam}
                    audio={false}
                    height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                />
            ) : (
                <div className={s.content}>Нажмите старт для старта видео звонка</div>
            )}
        </div>
    );
};

export default WebcamBlock;
