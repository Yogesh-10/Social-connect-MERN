import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteAccount, getCurrentProfile } from '../actions/profileActions'
import Spinner from '../components/layout/Spinner'
import DashboardActions from './DashboardActions'
import Education from './Education'
import Experience from './Experience'

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
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className='my-2'>
						<button
							onClick={() => dispatch(deleteAccount())}
							className='btn btn-danger'
						>
							<i className='fas fa-user-minus'>Delete My account</i>
						</button>
					</div>
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
