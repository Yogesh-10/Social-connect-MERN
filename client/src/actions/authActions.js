import axios from 'axios'
import {
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
} from '../constants/authConstants'
import { setAlert } from '../actions/alertActions'
import setAuthToken from '../utils/setAuthToken'
import { CLEAR_PROFILE } from '../constants/profileConstants'

// load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}
	try {
		const { data } = await axios.get('/api/auth')
		dispatch({
			type: USER_LOADED,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		})
	}
}

// Register user
export const register = (name, email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	try {
		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		)

		dispatch({
			type: REGISTER_SUCCESS,
			payload: data,
		})

		dispatch(loadUser())
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
		dispatch({
			type: REGISTER_FAIL,
		})
	}
}

// login user
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	try {
		const { data } = await axios.post('/api/auth', { email, password }, config)

		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		})

		dispatch(loadUser())
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
		dispatch({
			type: LOGIN_FAIL,
		})
	}
}

// logout / clear profile
export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	})
	dispatch({
		type: CLEAR_PROFILE,
	})
}
