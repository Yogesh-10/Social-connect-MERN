import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
	const alertReducer = useSelector((state) => state.alertReducer)

	return (
		<div>
			{alertReducer !== null &&
				alertReducer.length > 0 &&
				alertReducer.map((alert) => (
					<div key={alert.id} className={`alert alert-${alert.alertType}`}>
						{alert.msg}
					</div>
				))}
		</div>
	)
}

export default Alert
