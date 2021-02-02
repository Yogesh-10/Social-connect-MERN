import axios from 'axios'
import { GET_PROFILE, PROFILE_ERROR } from '../constants/profileConstants'
import { setAlert } from './alertActions'

// get current users profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const { data } = await axios.get('/api/profile/me')
		dispatch({
			type: GET_PROFILE,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		})
	}
}

// create or update profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post('/api/profile', formData, config)

		dispatch({
			type: GET_PROFILE,
			payload: data,
		})

		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

		if (!edit) {
			history.push('/dashboard')
		}
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}
