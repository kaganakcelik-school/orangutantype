import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SignIn = props => {
	const [name, setName] = useState('')
	
	useEffect(() => {
		setName(localStorage.getItem('name'))
	}, [])

	
	const handleNameChange = event => {
		localStorage.setItem('name', event.target.value)
		setName(event.target.value)
	}
	
	return (
		<div>
			<h1 className='text-4xl text-brown p-2'>Sign In</h1>

			<div className='flex justify-center'>
				<div className='px-4'>
					<p>
						There's no actual signin in yet but you can enter your name here for it to save with your score...
					</p>

					<br />
					
					<div className='flex justify-center'>
						name: &nbsp;
							
						<input 
							value={name}
							className='w-1/3' 
							onChange={handleNameChange}
							/>
					</div>

					<br />
					
					<div className='flex justify-center'>
						<Link className='bg-brown p-2 rounded-xl' to='/'>Back</Link>
					</div>
				</div>
			</div>

		</div>
	)
}

export default SignIn