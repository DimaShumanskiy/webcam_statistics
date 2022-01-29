import React, { FC, useRef } from 'react';

import Webcam from 'react-webcam';

import { useAppSelector } from '../../state/store';

import s from './Webcam.module.css';

const WebcamBlock: FC = () => {
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
                <span className={s.text}>
                    Press &laquo;Start&raquo; to start a video call
                </span>
            )}
        </div>
    );
};

export default WebcamBlock;
