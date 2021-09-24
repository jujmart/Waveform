import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenreCard from "../GenreCard";
import { getAllGenresThunk } from "../../store/genre";

const SearchEmpty = ({ setSearchInput, handleChange }) => {
	const genres = useSelector((state) => state.genres);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllGenresThunk());
	}, []);

	return (
		<>
			{genres.map((genre) => (
				<GenreCard
					handleChange={handleChange}
					genreName={genre.genreName}
					setSearchInput={setSearchInput}
				/>
			))}
		</>
	);
};

export default SearchEmpty;
