import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../store/session";
import { getAllGenresThunk } from "../store/genre";
import { uploadSongThunk } from "../store/songs";

const SongForm = () => {
  const [errors, setErrors] = useState([]);
  const [songUrl, setSongUrl] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [albumImageUrl, setAlbumImageUrl] = useState("");
  const [genres, setGenres] = useState(new Set());
  const user = useSelector((state) => state.session.user);
  const genresList = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenresThunk());
  }, [dispatch]);

  const handleOptionClick = (e) => {
    setGenres((prevGenres) => prevGenres.add(+e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      songUrl,
      title,
      artist,
      album,
      albumImageUrl,
      //genres: [...genres],
    };
    await dispatch(uploadSongThunk(data));
  };

  //   const onLogin = async (e) => {
  //     e.preventDefault();
  //     const data = await dispatch(login(email, password));
  //     if (data) {
  //       setErrors(data);
  //     }
  //   };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        {/* Need to be updated for aws */}
        <label htmlFor="songUrl">songUrl</label>
        <input
          name="songUrl"
          type="text"
          placeholder="songUrl"
          value={songUrl}
          required
          onChange={(e) => {
            setSongUrl(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="artist">Artist</label>
        <input
          name="artist"
          type="text"
          placeholder="artist"
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="album">Album</label>
        <input
          name="album"
          type="text"
          placeholder="album"
          value={album}
          onChange={(e) => {
            setAlbum(e.target.value);
          }}
        />
      </div>
      <div>
        {/* Need to be updated for aws */}
        <label htmlFor="albumImageUrl">AlbumImageUrl</label>
        <input
          name="albumImageUrl"
          type="text"
          placeholder="albumImageUrl"
          value={albumImageUrl}
          onChange={(e) => {
            setAlbumImageUrl(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="genres">Genres</label>
        <select
          name="genres"
          onChange={(e) => handleOptionClick(e)}
          defaultValue="Select Genre"
        >
          <option disabled>Select Genre</option>
          {genresList.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genreName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SongForm;
