import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import './App.css'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => {
	return (
		<Router>
			<>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<section className='container'>
					<Switch>
						<Route path='/register' component={Register} />
						<Route path='/login' component={Login} />
					</Switch>
				</section>
			</>
		</Router>
	)
}

export default App
