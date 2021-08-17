// constants
const GET_ALL_GENRES = "genres/GET_ALL_GENRES";

const getAllGenres = (genres) => ({
  type: GET_ALL_GENRES,
  payload: genres,
});

export const getAllGenresThunk = () => async (dispatch) => {
  const response = await fetch("/api/genres/");

  if (response.ok) {
    const { genres: data } = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(getAllGenres(data));
  }
};

const initialState = [];

export default function genresReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GENRES:
      return action.payload;
    default:
      return state;
  }
}
