import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../actions/profileActions'
import Spinner from '../components/layout/Spinner'
import DashboardActions from './DashboardActions'

const Dashboard = () => {
	const dispatch = useDispatch()

	const profileReducer = useSelector((state) => state.profileReducer)

	const authReducer = useSelector((state) => state.authReducer)

	const { user } = authReducer
	const { profile, loading } = profileReducer

	useEffect(() => {
		dispatch(getCurrentProfile())
	}, [dispatch])

	return loading && profile === null ? (
		<Spinner />
	) : (
		<>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<>
					{' '}
					<DashboardActions />{' '}
				</>
			) : (
				<>
					<p>you do not have a profile, please create one</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</>
			)}
		</>
	)
}

export default Dashboard
