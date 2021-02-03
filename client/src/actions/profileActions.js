import axios from 'axios'
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	DELETE_ACCOUNT,
	CLEAR_PROFILE,
} from '../constants/profileConstants'
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

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.put(
			'/api/profile/experience',
			formData,
			config
		)

		dispatch({
			type: UPDATE_PROFILE,
			payload: data,
		})

		dispatch(setAlert('Experience Added', 'success'))

		history.push('/dashboard')
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

// Add Experience
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.put('/api/profile/education', formData, config)

		dispatch({
			type: UPDATE_PROFILE,
			payload: data,
		})

		dispatch(setAlert('Education Added', 'success'))

		history.push('/dashboard')
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

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const { data } = await axios.delete(`/api/profile/experience/${id}`)
		dispatch({
			type: UPDATE_PROFILE,
			payload: data,
		})

		dispatch(setAlert('Experience Removed', 'success'))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const { data } = await axios.delete(`/api/profile/education/${id}`)
		dispatch({
			type: UPDATE_PROFILE,
			payload: data,
		})

		dispatch(setAlert('Education Removed', 'success'))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		})
	}
}

// Delete account and profile
export const deleteAccount = (id) => async (dispatch) => {
	if (
		window.confirm(
			'Are you sure to delete the account, once deleted cannot be retreived'
		)
	)
		try {
			await axios.delete(`/api/profile`)
			dispatch({
				type: CLEAR_PROFILE,
			})
			dispatch({
				type: DELETE_ACCOUNT,
			})

			dispatch(setAlert('Account deleted Permanently', 'success'))
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			})
		}
}
