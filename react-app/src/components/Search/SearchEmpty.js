import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenreCard from "../GenreCard";
import { getAllGenresThunk } from "../../store/genre";

const SearchEmpty = ({ setSearchInput, handleChange }) => {
	const genres = useSelector((state) => state.genres);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllGenresThunk());
	}, [dispatch]);

	return (
		<>
			{genres.map((genre) => (
				<GenreCard
					key={genre.id}
					handleChange={handleChange}
					genreName={genre.genreName}
					setSearchInput={setSearchInput}
				/>
			))}
		</>
	);
};

export default SearchEmpty;
