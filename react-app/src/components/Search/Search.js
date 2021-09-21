import { useDispatch } from "react-redux";
import { searchThunk } from "../../store/search";
import SearchEmpty from "./SearchEmpty";
import SearchPopulated from "./SearchPopulated";

const Search = () => {
	const dispatch = useDispatch();

	function handleChange(searchInput) {
		if (searchInput.length) {
			dispatch(searchThunk(searchInput));
		}
	}

	return (
		<div id="search-container-div">
			<input
				type="text"
				onChange={(e) => {
					handleChange(e.target.value);
				}}
			/>
			<SearchEmpty />
			<SearchPopulated />
		</div>
	);
};

export default Search;
