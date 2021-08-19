// constants
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST";

const createPlaylist = (playlist) => ({
  type: CREATE_PLAYLIST,
  payload: playlist,
});

const deletePlaylist = (id) => ({
  type: DELETE_PLAYLIST,
  payload: id,
});

export const createPlaylistThunk = (payload) => async (dispatch) => {
  const response = await fetch("/api/playlists/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const { playlist } = await response.json();
    if (playlist.errors) {
      return;
    }
    dispatch(createPlaylist(playlist));
  }
};

export const editPlaylistThunk = (payload, id) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const { playlist } = await response.json();
    if (playlist.errors) {
      return;
    }
    dispatch(createPlaylist(playlist));
  }
};

export const getOnePlaylistThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${id}`);

  if (response.ok) {
    const { playlist } = await response.json();
    if (playlist.errors) {
      return;
    }
    dispatch(createPlaylist(playlist));
  } else {
    return response;
  }
};

export const deletePlaylistThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const { playlistId } = await response.json();
    if (playlistId.errors) {
      return;
    }
    dispatch(deletePlaylist(playlistId));
  }
};

const initialState = {};

export default function playlistsReducer(state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case CREATE_PLAYLIST:
      const newCreateState = { ...state };
      newCreateState[action.payload.id] = action.payload;
      return newCreateState;
    case DELETE_PLAYLIST:
      const newDeleteState = { ...state };
      delete newDeleteState[action.payload];
      return newDeleteState;
    default:
      return state;
  }
}
