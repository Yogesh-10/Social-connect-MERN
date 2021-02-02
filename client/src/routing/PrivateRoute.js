import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// const dispatch = useDispatch()

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authReducer = useSelector((state) => state.authReducer)
	const { loading, isAuthenticated } = authReducer

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

export default PrivateRoute
