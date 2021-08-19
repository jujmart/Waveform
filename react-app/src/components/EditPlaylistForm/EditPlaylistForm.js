import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editPlaylistThunk, getOnePlaylistThunk } from "../../store/playlist";

const EditPlaylistForm = ({ setShowModal }) => {
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.session.user);
  const playlist = useSelector((state) => state.playlists[id]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
    };
    await dispatch(editPlaylistThunk(data, id));
    setShowModal(false);
  };

  useEffect(() => {
    if (!playlist) {
      dispatch(getOnePlaylistThunk(id));
    }
  }, [dispatch, playlist]);

  useEffect(() => {
    setTitle(playlist?.title);
    setDescription(playlist?.description);
  }, [playlist]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="Title">Title</label>
        <input
          name="Title"
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditPlaylistForm;
