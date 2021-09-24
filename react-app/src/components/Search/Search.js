import { useState } from "react";
import { useDispatch } from "react-redux";
import HomePageLoggedIn from "../../context/Homepage/Homepage-logged-in";
import { searchThunk } from "../../store/search";
import SearchEmpty from "./SearchEmpty";
import SearchPopulated from "./SearchPopulated";

const Search = () => {
	const dispatch = useDispatch();
	const [searchInput, setSearchInput] = useState("");

	function handleChange(newSearchInput) {
		if (newSearchInput.length) {
			dispatch(searchThunk(newSearchInput));
		}
	}

	return (
		<div id="search-container-div">
			<input
				type="text"
				value={searchInput}
				onChange={(e) => {
					setSearchInput(e.target.value);
					handleChange(e.target.value);
				}}
			/>
			{!searchInput.length ? <HomePageLoggedIn /> : <SearchPopulated />}
		</div>
	);
};

export default Search;
