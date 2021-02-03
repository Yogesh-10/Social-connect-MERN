import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/authActions'

const Navbar = () => {
	const dispatch = useDispatch()

	const authReducer = useSelector((state) => state.authReducer)

	const { loading, isAuthenticated } = authReducer

	const authLinks = (
		<ul>
			<li>
				<a href='/profiles '>Developers</a>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user'></i>{' '}
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>
			<li>
				<a onClick={() => dispatch(logout())} href='#!'>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	)

	const guestLinks = (
		<ul>
			<li>
				<a href='/profiles '>Developers</a>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	)

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='#!'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			{!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
		</nav>
	)
}

export default Navbar
