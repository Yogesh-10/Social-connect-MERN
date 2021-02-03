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
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import GetProfiles from './components/profiles/GetProfiles'
import Profile from './components/profile/profile'
import Posts from './components/posts/Posts'

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
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/profiles' component={GetProfiles} />
							<Route exact path='/profile/:id' component={Profile} />
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<PrivateRoute
								exact
								path='/create-profile'
								component={CreateProfile}
							/>
							<PrivateRoute
								exact
								path='/edit-profile'
								component={CreateProfile}
							/>
							<PrivateRoute
								exact
								path='/add-experience'
								component={AddExperience}
							/>
							<PrivateRoute
								exact
								path='/add-education'
								component={AddEducation}
							/>
							<PrivateRoute exact path='/posts' component={Posts} />
						</Switch>
					</section>
				</>
			</Router>
		</Provider>
	)
}

export default App
