import {
	CLEAR_PROFILE,
	GET_PROFILE,
	PROFILE_ERROR,
} from '../constants/profileConstants'

const initialState = {
	profile: null,
	profileFiles: [],
	repos: [],
	loading: true,
	error: {},
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false,
			}
		case PROFILE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false,
			}
		default:
			return state
	}
}

export default profileReducer
