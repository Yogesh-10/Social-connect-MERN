import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import './App.css'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
// Redux stuff
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'
import { loadUser } from './actions/authActions'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './dashboard/Dashboard'
import PrivateRoute from './routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	return (
		<Provider store={store}>
			<Router>
				<>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route path='/register' component={Register} />
							<Route path='/login' component={Login} />
							<PrivateRoute path='/dashboard' component={Dashboard} />
							<PrivateRoute path='/create-profile' component={CreateProfile} />
							<PrivateRoute path='/edit-profile' component={CreateProfile} />
						</Switch>
					</section>
				</>
			</Router>
		</Provider>
	)
}

export default App
