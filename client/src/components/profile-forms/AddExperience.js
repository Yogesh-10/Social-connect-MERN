import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addExperience } from '../../actions/profileActions'

const AddExperience = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})

	// const [toDateDisabled, toggleDisabled] = useState(false)

	const { company, title, location, from, to, current, description } = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	return (
		<>
			<section className='container'>
				<h1 className='large text-primary'>Add An Experience</h1>
				<p className='lead'>
					<i className='fas fa-code-branch'></i> Add any developer/programming
					positions that you have had in the past
				</p>
				<small>* = required field</small>
				<form
					className='form'
					onSubmit={(e) => {
						e.preventDefault()
						dispatch(addExperience(formData, history))
					}}
				>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* Job Title'
							name='title'
							required
							value={title}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* Company'
							name='company'
							required
							value={company}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Location'
							value={location}
							onChange={onChange}
							name='location'
						/>
					</div>
					<div className='form-group'>
						<h4>From Date</h4>
						<input type='date' name='from' value={from} onChange={onChange} />
					</div>
					<div className='form-group'>
						<p>
							<input
								type='checkbox'
								name='current'
								checked={current}
								value={current}
								onChange={() => setFormData({ ...formData, current: !current })}
							/>{' '}
							Current Job
						</p>
					</div>
					<div className='form-group'>
						<h4>To Date</h4>
						<input
							type='date'
							name='to'
							value={to}
							onChange={onChange}
							disabled={current}
						/>
					</div>
					<div className='form-group'>
						<textarea
							name='description'
							cols='30'
							rows='5'
							placeholder='Job Description'
							value={description}
							onChange={onChange}
						></textarea>
					</div>
					<input type='submit' className='btn btn-primary my-1' />
					<a className='btn btn-light my-1' href='dashboard.html'>
						Go Back
					</a>
				</form>
			</section>
		</>
	)
}

export default AddExperience
