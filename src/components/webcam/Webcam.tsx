import React, { FC } from 'react';

import Webcam from 'react-webcam';

import s from './Webcam.module.css';

import { useAppSelector } from 'state/store';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
};
const WebcamBlock: FC = () => {
    const playing = useAppSelector<boolean>(state => state.webcam.playing);

    return (
        <div className={s.container}>
            {playing ? (
                <Webcam
                    className={s.webcam}
                    audio={false}
                    height={720}
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
