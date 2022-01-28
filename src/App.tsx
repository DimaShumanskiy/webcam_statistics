import React, { useRef, useState } from 'react';

import './App.css';
import Webcam from 'react-webcam';

const App = (): any => {
    const webcamRef = useRef(null);
    const [playing, setPlaying] = useState<boolean>(false);
    console.log(playing);

    const stopPlay = (): any => {
        setPlaying(false);
    };
    const startPlay = (): any => {
        setPlaying(true);
    };
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user',
    };

    return (
        <div className="App">
            <div className="container">
                {playing ? (
                    <Webcam
                        audio={false}
                        height={720}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={1280}
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <div>padasd</div>
                )}
            </div>
            <div className="input">
                {playing ? (
                    <button type="button" className="btn" onClick={stopPlay}>
                        Stop
                    </button>
                ) : (
                    <button type="button" className="btn" onClick={startPlay}>
                        Start
                    </button>
                )}
            </div>
        </div>
    );
};

export default App;
