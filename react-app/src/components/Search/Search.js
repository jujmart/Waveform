import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchThunk } from "../../store/search";
import SearchEmpty from "./SearchEmpty";
import SearchPopulated from "./SearchPopulated";

import "./Search.css";

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
			<div id="search-input-container-div">
				<span className="material-icons search-input-icon">
					search&nbsp;&nbsp;
				</span>
				<input
					type="text"
					id="search-input"
					placeholder="Artist, song, genre, user..."
					value={searchInput}
					onChange={(e) => {
						setSearchInput(e.target.value);
						handleChange(e.target.value);
					}}
				/>
				{searchInput ? (
					<div
						id="search-input-clear"
						onClick={() => setSearchInput("")}
					>
						X
					</div>
				) : null}
			</div>
			{!searchInput.length ? (
				<SearchEmpty
					setSearchInput={setSearchInput}
					handleChange={handleChange}
				/>
			) : (
				<SearchPopulated />
			)}
		</div>
	);
};

export default Search;
