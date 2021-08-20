import React, { useState } from 'react';
import { useRef, useEffect } from 'react';

const HomePageLoggedOut = () =>{


    // let [audioElement, setAudioElement] = useState(null);
    const [track, setTrack] = useState();
    const [audioContext, setAudioContext] = useState(new AudioContext());
    const [audioElement, setAudioElement] = useState();

    const audio = useRef(null);
    const playButton = useRef(null);


    useEffect(() => {
        if (audio.current) {
            console.log(audio.current,'audioCurrent')
            // setAudioContext(new AudioContext())
            console.log(audioContext, 'Audio Context')

            setAudioElement(audio.current)
            console.log(audioElement, 'Audio Element')

            setTrack(audioContext.createMediaElementSource(audio.current))



            // mediaPlayer.current.src = 'https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Make+Way+For+The+King.mp3'
            // https://spot-a-cloud.s3.us-east-2.amazonaws.com/5fe301163f5f423c91327d69864a2991.mp3


        }
    },[audio, playButton])

    useEffect(() => {
        console.log(track, 'TRACK')
        track?.connect(audioContext.destination);
    })

    const playAudio = () => {audioElement.play()}

    return (
        <div id='homepage-lo-container_div'>
            <div id='homepage-title-info_div'>
            <h1 id='homepage-title_h1'>WAVEFORM</h1>
            <h2 id='homepage-phrase_h2'>A website for audioElement lovers Created by you</h2>
            <h3 id='homepage-mvp_h3'>Add your songs, create playlists</h3>
            <button id='homepage-signup_btn'>Join Waveform for free</button>
            <audio ref={audio} crossOrigin='anonymous' src='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Make+Way+For+The+King.mp3' accept={`*/`}></audio>
            <button onClick={playAudio} data-playing="false" role="switch" aria-checked="false">
                <span>Play/Pause</span>
            </button>
        </div>


    {/* Homepage Click Display for Features */}
        <div id='homepage-lo-info_div'>
            <div id='homepage-lo-info-disp_div'>
                <button>Scroll left</button>
                <div>
                    <h2>Feature #1</h2>
                    <div>
                        <img src='' alt='Image'></img>
                        <p>This will be a description of the feature for feature #1.</p>
                    </div>
                </div>
                <div>
                    <h2>Feature #2</h2>
                    <div>
                        <img src='' alt='Image'></img>
                        <p>This will be a description of the feature for feature #2</p>
                    </div>
                </div>
                <div>
                    <h2>Feature #3</h2>
                    <div>
                        <img src='' alt='Image'></img>
                        <p>This will be a description of the feature for feature #1.</p>
                    </div>
                </div>
                <div>
                    <h2>Feature #4</h2>
                    <div>
                        <img src='' alt='Image'></img>
                        <p>This will be a description of the feature for feature #2</p>
                    </div>
                </div>
                <button>Scroll right</button>
            </div>
        </div>
    </div>
    )
}

export default HomePageLoggedOut
