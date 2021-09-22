// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_FOLLOW = "session/ADD_FOLLOW"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});


const addFollow = (id) => ({
	type: ADD_FOLLOW,
	payload: id
  })

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp =
	(username, email, password, awsData) => async (dispatch) => {
		let profilePhotoUrl = null;
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
				profilePhotoUrl,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			if (typeof awsData.get("image") !== "string") {
				const AWSResponse = await fetch(`/api/auth/AWS/${data.id}`, {
					method: "POST",
					body: awsData,
				});

				if (AWSResponse.ok) {
					const AWSData = await AWSResponse.json();
					if (AWSData.errors) {
						return;
					}
				}
			}
			dispatch(setUser(data));
			return null;
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	};

export const getASingleUserThunk = (userId) => async () => {
	const response = await fetch(`/api/users/${userId}`);

	if (response.ok) {
		const user = await response.json();
		if (user.errors) {
			return;
		}
		return user;
	}
};


export const addFollowThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/users/add-follower`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({id})
	})
	  const data = await response.json()

	  if (data.success) {
		await dispatch(addFollow(id))

	  }
	  if (data.error)
	  return data
  }


const initialState = { user: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ADD_FOLLOW:
			return { user: {

				email: state.user.email,
				follows: [...state.user.follows, action.payload],
				id: state.user.id,
				profilePhotoUrl: state.user.profilePhotoUrl,
				username: state.user.username

			}}
		default:
			return state;
	}
}
