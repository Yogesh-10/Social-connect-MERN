import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import alertReducer from './reducers/alertReducer'
import authReducer from './reducers/authReducers'
import profileReducer from './reducers/profileReducer'

const reducer = combineReducers({
	alertReducer,
	authReducer,
	profileReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
