const GenreCard = ({ genreName, setSearchInput, handleChange }) => {
	const genreColors = {
		Rock: "red",
		Rap: "blue",
		"Hip-Hop": "lightgreen",
		"K-pop": "orange",
		Electronic: "yellow",
		Metal: "pink",
		Pop: "darkorchid",
		Americana: "gray",
		"Alternative Rock": "white",
		"R & B": "rgb(139, 37, 37)",
		Chill: "rgb(1, 87, 1)",
		Focus: "rgb(35, 142, 146)",
	};

	const handleClick = () => {
		setSearchInput(genreName);
		handleChange(genreName);
	};

	return (
		<div
			className="genre-card-div"
			onClick={handleClick}
			style={{ backgroundColor: genreColors[genreName] }}
		>
			<h3 className="genre-card-name">{genreName}</h3>
		</div>
	);
};

export default GenreCard;
