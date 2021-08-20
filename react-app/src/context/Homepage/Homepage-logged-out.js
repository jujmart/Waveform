import React from 'react';
import { useRef, useEffect } from 'react';

const HomePageLoggedOut = () =>{






    return (
        <div id='homepage-lo-container_div'>
            <div id='homepage-title-info_div'>
            <h1 id='homepage-title_h1'>WAVEFORM</h1>
            <h2 id='homepage-phrase_h2'>A website for audioElement lovers Created by you</h2>
            <h3 id='homepage-mvp_h3'>Add your songs, create playlists</h3>
            <button id='homepage-signup_btn'>Join Waveform for free</button>
            <audio accept={`*/`}></audio>
            <button  id='homepage-play_btn' data-playing="false" role="switch" aria-checked="false">
                <span>Play/Pause</span>
            </button>
        </div>


    {/* Homepage Click Display for Features */}
        <div id='homepage-lo-info_div'>
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
    )
}

export default HomePageLoggedOut
