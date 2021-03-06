import React, { useState } from "react";
// import { useRef, useEffect } from "react";
import homePageLogo from "../Homepage/WAVEFORM OUTLINE NO BACKGROUND.png";
import linkedIn from "./linkedin-logo.png";

// import mp3 from "../../components/Songs/Tyler The Creator - JUGGERNAUT (Lyrics) ft. Lil Uzi Vert & Pharrell Williams.mp3";

const HomePageLoggedOut = () => {
	// let [audioElement, setAudioElement] = useState(null);
	// const [track, setTrack] = useState();
	// const [audioContext, setAudioContext] = useState(new AudioContext());
	// const [audioElement, setAudioElement] = useState();

	// useEffect(() => {
	//     if (audio.current) {
	//         console.log(audio.current,'audioCurrent')
	//         // setAudioContext(new AudioContext())
	//         console.log(audioContext, 'Audio Context')

	//         setAudioElement(audio.current)
	//         console.log(audioElement, 'Audio Element')

	//         setTrack(audioContext.createMediaElementSource(audio.current))
	//         console.log()

	//         // mediaPlayer.current.src = 'https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Make+Way+For+The+King.mp3'
	//         // https://spot-a-cloud.s3.us-east-2.amazonaws.com/5fe301163f5f423c91327d69864a2991.mp3

	//     }
	// }, [audio, playButton])

	// useEffect(() => {
	// 	// console.log(track, "TRACK");
	// 	track?.connect(audioContext.destination);
	// }, [track, audioContext.destination]);

	return (
		<div id="homepage-lo-container_div">
			<div id="homepage-title-info_div">
				<h1 id="homepage-title_h1">WAVEFORM</h1>
				<h2 id="homepage-phrase_h2">
					A website for Music lovers Created by you
				</h2>
				<h3 id="homepage-mvp_h3">Add your songs, create playlists</h3>
				{/* <button id="homepage-signup_btn">Join Waveform for free</button> */}
				{/* <audio
					id="homepage-player"
					controls={true}
					src="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/G-Eazy+-+Acting+Up+ft+Devon+Baldwin.mp3"
					accept={`/`}
				></audio> */}
				<img id="large-logo" src={homePageLogo} alt="logo" />
			</div>

			<div id="lower-links">
				<a
					id="privacy-links"
					href="https://www.youtube.com/watch?v=AubJS7oWaWo"
					target="_blank"
					rel="noreferrer"
				>
					Legal | Privacy Center | Privacy Policy | Cookies | About
					{/* Ads */}
				</a>
				<span id="andru-links">
					<a
						href="https://github.com/andru17urdna"
						target="_blank"
						rel="noreferrer"
					>
						<img
							id="andru-github-link"
							className="link-img"
							src="data:image/png;base64,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"
							alt="Github"
						/>
					</a>
					<a
						href="https://www.linkedin.com/in/andrew-watkins-533280173/"
						target="_blank"
						rel="noreferrer"
					>
						<img
							id="andru-linkedin-link"
							className="link-img linkedin-logo"
							src={linkedIn}
							alt="LinkedIn"
						/>
					</a>
				</span>
				<p id="andru-p" className="link-font">
					Andru
				</p>
				<span id="justice-links">
					<a
						href="https://github.com/jujmart"
						target="_blank"
						rel="noreferrer"
					>
						<img
							id="justice-github-link"
							className="link-img"
							src="data:image/png;base64,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"
							alt="Github"
						/>
					</a>
					<a
						href="https://www.linkedin.com/in/justice-martin-34043340/"
						target="_blank"
						rel="noreferrer"
					>
						<img
							id="justice-linkedin-link"
							className="link-img linkedin-logo"
							src={linkedIn}
							alt="LinkedIn"
						/>
					</a>
				</span>
				<p id="justice-p" className="link-font">
					Justice
				</p>
				<span id="max-links">
					<a
						href="https://github.com/MaxwellWehner"
						target="_blank"
						rel="noreferrer"
					>
						<img
							id="max-github-link"
							className="link-img"
							src="data:image/png;base64,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"
							alt="Github"
						/>
					</a>
					<a
						href="https://www.linkedin.com/in/maxwell-wehner-7a2066220/"
						target="_blank"
						rel="noreferrer"
					>
						<img
							id="max-linkedin-link"
							className="link-img linkedin-logo"
							src={linkedIn}
							alt="LinkedIn"
						/>
					</a>
				</span>
				<p id="max-p" className="link-font">
					Maxwell
				</p>
			</div>

			{/* Homepage Click Display for Features */}
			{/* <div id="homepage-lo-info_div">
				<button id="homepage-scroll-left">Left</button>
				<div id="homepage-lo-info-disp_div">
					<div className="mvp-container_div" id="mvp1">
						<h2 className="mvp_h2">Feature #1</h2>
						<img
							className="mvp_gif"
							src="https://thumbs.dreamstime.com/b/happy-cat-closeup-portrait-funny-smile-cardboard-young-blue-background-102078702.jpg"
							alt="Img"
						></img>
						<p className="mvp_description">
							This will be a description of the feature for
							feature #1.
						</p>
					</div>
					<div className="mvp-container_div" id="mvp2">
						<h2 className="mvp_h2">Feature #2</h2>
						<img
							className="mvp_gif"
							src="https://thumbs.dreamstime.com/b/happy-cat-closeup-portrait-funny-smile-cardboard-young-blue-background-102078702.jpg"
							alt="Img"
						></img>
						<p className="mvp_description">
							This will be a description of the feature for
							feature #2
						</p>
					</div>
					<div className="mvp-container_div" id="mvp3">
						<h2 className="mvp_h2">Feature #3</h2>
						<img
							className="mvp_gif"
							src="https://thumbs.dreamstime.com/b/happy-cat-closeup-portrait-funny-smile-cardboard-young-blue-background-102078702.jpg"
							alt="Img"
						></img>
						<p className="mvp_description">
							This will be a description of the feature for
							feature #1.
						</p>
					</div>
					<div className="mvp-container_div" id="mvp4">
						<h2 className="mvp_h2">Feature #4</h2>
						<img
							className="mvp_gif"
							src="https://thumbs.dreamstime.com/b/happy-cat-closeup-portrait-funny-smile-cardboard-young-blue-background-102078702.jpg"
							alt="Img"
						></img>
						<p className="mvp_description">
							This will be a description of the feature for
							feature #2
						</p>
					</div>
					<div id="spacer_div"></div>
				</div>
				<button id="homepage-scroll-right">Right</button>
			</div> */}
		</div>
	);
};

export default HomePageLoggedOut;
