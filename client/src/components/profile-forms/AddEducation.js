import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addEducation } from '../../actions/profileActions'

const AddEducation = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})

	// const [toDateDisabled, toggleDisabled] = useState(false)

	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	} = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	return (
		<>
			<section className='container'>
				<h1 className='large text-primary'>Add your Education</h1>
				<p className='lead'>
					<i className='fas fa-code-branch'></i> Add any School/College that you
					have had attended
				</p>
				<small>* = required field</small>
				<form
					className='form'
					onSubmit={(e) => {
						e.preventDefault()
						dispatch(addEducation(formData, history))
					}}
				>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* School or College'
							name='school'
							required
							value={school}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* degree'
							name='degree'
							required
							value={degree}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='field of study'
							value={fieldofstudy}
							onChange={onChange}
							name='fieldofstudy'
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
							Current Education
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
							placeholder='Program Description'
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

export default AddEducation
