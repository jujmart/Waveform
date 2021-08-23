// constants
const GET_ALL_USERS = "users/GET_ALL_USERS";

const getAllUsers = (users) => ({
	type: GET_ALL_USERS,
	payload: users,
});

export const getAllUsersThunk = (limit) => async (dispatch) => {
	const response = await fetch(`/api/users/limit/${limit}`);

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getAllUsers(data.users));
	}
};

const initialState = [];

export default function usersReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case GET_ALL_USERS:
			return action.payload;
		default:
			return state;
	}
}
