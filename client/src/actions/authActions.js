import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../constants/authConstants'
import { setAlert } from '../actions/alertActions'

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
