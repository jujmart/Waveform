import React from 'react';
import { useRef, useEffect } from 'react';

const HomePageLoggedOut = () =>{


    const mediaPlayer = useRef(null);
    const waveform = useRef(null);
    console.log(mediaPlayer)

    useEffect(() => {
        if (mediaPlayer.current) {
            const canvas = waveform.current
            const audioContext = new AudioContext();
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d')

            mediaPlayer.current.src = 'https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Make+Way+For+The+King.mp3'
            // https://spot-a-cloud.s3.us-east-2.amazonaws.com/5fe301163f5f423c91327d69864a2991.mp3

            const audioSource = audioContext.createMediaElementSource(mediaPlayer.current)
            const anaylser = audioContext.createAnalyser();
            audioSource.connect(anaylser)
            anaylser.connect(audioContext.destination)
            anaylser.fftSize = 512;

            const bufferLength = anaylser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const barWidth = 15;
            let barHeight
            let x;

            function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray){
                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i] * 1.5 + 50;
                    ctx.save();
                    //sets center point for the canvas rotation: center
                    ctx.translate(canvas.width/2, canvas.height/2);
                    ctx.rotate(i * Math.PI * 8/ bufferLength )

                    // const red = i * barHeight/ 20;
                    // const green = i * 4;
                    // const blue = barHeight/2;
                    // ctx.fillStyle = 'white'
                    // ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight - 30, barWidth, 15);
                    // ctx.fillRect(0, 0, barWidth, 15);

                    const hue = i/2;
                    ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)'
                    // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
                    ctx.fillRect(0, 0, barWidth, barHeight);
                    // ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
                    x += barWidth;
                    ctx.restore();
                }
            }

            function animate(){
                x = 0;
                //built in method that clears the entire canvas from previous "frame"
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                anaylser.getByteFrequencyData(dataArray)
                drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray)

                requestAnimationFrame(animate);
            }
            animate();
        }
    },[mediaPlayer])



    return (
        <div id='homepage-lo-container_div'>
            <div id='homepage-title-info_div'>
            <h1 id='homepage-title_h1'>WAVEFORM</h1>
            <h2 id='homepage-phrase_h2'>A website for audioElement lovers Created by you</h2>
            <h3 id='homepage-mvp_h3'>Add your songs, create playlists</h3>
            <button id='homepage-signup_btn'>Join Waveform for free</button>
            <audio ref={mediaPlayer} controls={true} accept={`*/`}></audio>
        </div>

        <div>
            <canvas ref={waveform} id='canvas1'></canvas>
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
