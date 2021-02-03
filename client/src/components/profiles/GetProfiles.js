import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfiles } from '../../actions/profileActions'
import Spinner from '../layout/Spinner'
import ProfileItems from './ProfileItems'

const GetProfiles = () => {
	const dispatch = useDispatch()
	const profileReducer = useSelector((state) => state.profileReducer)
	const { profiles, loading } = profileReducer

	useEffect(() => {
		dispatch(getProfiles())
	}, [dispatch])

	return (
		<>
			<>
				{loading ? (
					<Spinner />
				) : (
					<>
						<h1 className='large text-primary'>Developers</h1>
						<p className='lead'>
							<i className='fab fa-connectdevelop' /> Browse and connect with
							developers
						</p>
						<div className='profiles'>
							{profiles.length > 0 ? (
								profiles.map((profile) => (
									<ProfileItems key={profile._id} profile={profile} />
								))
							) : (
								<h4>No profiles found...</h4>
							)}
						</div>
					</>
				)}
			</>
		</>
	)
}

export default GetProfiles
