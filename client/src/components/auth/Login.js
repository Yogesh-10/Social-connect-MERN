import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/authActions'

const Login = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const authReducer = useSelector((state) => state.authReducer)

	const { isAuthenticated } = authReducer

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData

	const onchange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const submitHandler = async (e) => {
		e.preventDefault()
		dispatch(login(email, password))
		// **FETCH THROUGH COMPONENT WITHOUT REDUX ACTION**//
		// const newUser = {
		// 	email,
		// 	password,
		// }
		// try {
		// 	const config = {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	}
		// 	const body = JSON.stringify(newUser)
		// 	const res = await axios.post('/api/users', body, config)
		// 	console.log(res.data)
		// } catch (error) {
		// 	console.error(error.res.data)
		// }
	}
	// redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />
	}

	return (
		<>
			<section className='container'>
				<h1 className='large text-primary'>Sign In</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Login to Your Account
				</p>
				<form className='form' onSubmit={submitHandler}>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => onchange(e)}
							name='email'
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							minLength='6'
							email={password}
							onChange={(e) => onchange(e)}
						/>
					</div>

					<input type='submit' className='btn btn-primary' value='Login' />
				</form>
				<p className='my-1'>
					Dont have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</section>
		</>
	)
}

export default Login
