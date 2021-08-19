// constants
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";

const createPlaylist = (playlist) => ({
  type: CREATE_PLAYLIST,
  payload: playlist,
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
    default:
      return state;
  }
}
