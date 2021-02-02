import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAlert } from '../../actions/alertActions'
import { register } from '../../actions/authActions'

const Register = () => {
	const dispatch = useDispatch()

	// const alertReducer = useSelector((state) => state.alertReducer)

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})
	const { name, email, password, password2 } = formData

	const onchange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== password2) {
			dispatch(setAlert('password do not match', 'danger'))
		} else {
			dispatch(register(name, email, password))
			// **FETCH THROUGH COMPONENT WITHOUT REDUX ACTION**//
			// const newUser = {
			// 	name,
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
	}

	return (
		<>
			<section className='container'>
				<h1 className='large text-primary'>Sign Up</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Create Your Account
				</p>
				<form className='form' onSubmit={submitHandler}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Name'
							name='name'
							value={name}
							onChange={(e) => onchange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => onchange(e)}
							name='email'
						/>
						<small className='form-text'>
							This site uses Gravatar so if you want a profile image, use a
							Gravatar email
						</small>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							email={password}
							onChange={(e) => onchange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Confirm Password'
							name='password2'
							value={password2}
							onChange={(e) => onchange(e)}
						/>
					</div>
					<input type='submit' className='btn btn-primary' value='Register' />
				</form>
				<p className='my-1'>
					Already have an account? <Link to='/login'>Sign In</Link>
				</p>
			</section>
		</>
	)
}

export default Register
