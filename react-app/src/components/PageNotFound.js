import "./css/page-not-found.css";

export default function PageNotFound() {
	return (
		<div id="page-not-found_container-div">
			<h1 id="page-not-found_header">Page Not Found! Try Again!</h1>
			<iframe
				src="https://giphy.com/embed/JJhiRdcYfcokU"
				width="480"
				height="313"
				frameBorder="0"
				className="giphy-embed"
				allowFullScreen
				title="First Try"
			></iframe>
			<p>
				<a
					href="https://giphy.com/gifs/legomovie-batman-the-lego-moive-JJhiRdcYfcokU"
					target="_blank"
					rel="noreferrer"
				>
					via GIPHY
				</a>
			</p>
		</div>
	);
}
