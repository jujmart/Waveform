const GenreCard = ({ genreName, setSearchInput, handleChange }) => {
	const handleClick = () => {
		setSearchInput(genreName);
		handleChange(genreName);
	};

	return (
		<div onClick={handleClick}>
			<h3>{genreName}</h3>
		</div>
	);
};

export default GenreCard;
