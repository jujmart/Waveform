import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addSongToPlaylistThunk } from "../store/playlist";
import { useEffect, useState } from "react";

const PlaylistDropDown = ({songId, userPlaylistIds, playlists, playlistId}) => {
    const dispatch = useDispatch();

	const [showPlaylistsDiv, setShowPlaylistsDiv] = useState(false);


    const addToPlaylist = async (e) => {
		await dispatch(addSongToPlaylistThunk(songId, e.target.value));
		setShowPlaylistsDiv(false);
	};

    const handleClick = useCallback(() => {
        if (showPlaylistsDiv) {
            setShowPlaylistsDiv(false)
        }
    })

    useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => {
		  document.removeEventListener("click", handleClick);
		};
	  }, [showPlaylistsDiv]);


    return (
        <>
            <div>
            <p className="allow-pointer-events">
                    <span
                        onClick={() =>
                            setShowPlaylistsDiv((prevState) => !prevState)
                        }
                        className="allow-pointer-events material-icons"
                    >
                        playlist_add
                    </span>
                    </p>
                    {showPlaylistsDiv && (
                        <div
                        className="allow-pointer-events add-to-playlist_dropdown">
                            <ul className="allow-pointer-events add-to-playlist_dropdown_ul">
                                {userPlaylistIds.map((userPlaylistId) =>
                                    playlistId !== userPlaylistId ? (
                                        <li
                                            key={userPlaylistId}
                                            value={userPlaylistId}
                                            onClick={addToPlaylist}
                                            className="allow-pointer-events add-to-playlist_dropdown_li"
                                        >
                                            {playlists[userPlaylistId].title}
                                        </li>
                                    ) : null
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </>

    )


}

export default PlaylistDropDown
