import React from 'react';

const HomePageLoggedOut = () =>{
    return (
        <div>
            <div>
            <h1>WAVEFORM</h1>
            <h2>A website for music lovers Created by you</h2>
            <h3>Add your songs, create playlists</h3>
            <button>Join Waveform for free</button>
        </div>


    {/* Homepage Click Display for Features */}
        <div>
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
