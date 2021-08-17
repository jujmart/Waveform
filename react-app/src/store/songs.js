// constants
// const GET_ALL_GENRES = "genres/GET_ALL_GENRES";

// const getAllGenres = (genres) => ({
//   type: GET_ALL_GENRES,
//   payload: genres,
// });

export const uploadSongThunk = (payload) => async (dispatch) => {
  const response = await fetch("/api/songs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  }
};

// const initialState = [];

// export default function genresReducer(state = initialState, action) {
//   switch (action.type) {
//     case GET_ALL_GENRES:
//       return action.payload;
//     default:
//       return state;
//   }
// }
