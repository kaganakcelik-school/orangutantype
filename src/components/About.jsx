import {Link} from 'react-router-dom'

const About = props => {
	return (
		<div>
			<h1 className='text-4xl text-brown p-2'>About</h1>

			<div className='flex justify-center'>
				<div className='px-4 md:w-2/3'>
					<p>
						Orangutantype is a typing speed test that allows you to test your WPM by doing test with real world sentences. This helps improve your real world typing skills.
					</p>
					<br/>
					<p>
						Our sentences are randomly generated via AI, and they serve as a way to type while also learning something new. They also allow users to type content that is more similar to things that you would see in real life. This allows you to improve your real word typing speed.
					</p>
					<br/>
					<p>
						Orangutantype took inspiration from sites such as monkeytype.com and keybr.com which can be seen in how Orangutantype functions and is designed.
					</p>
					<br />
					<p className='text-sm text-stone-500'>
						For inquiry, contanct: akcelikkagan@gmail.com
					</p>

					<br />
					<div className='flex justify-center'>
						<Link className='bg-brown p-2 rounded-xl' to='/'>Back</Link>
					</div>
				</div>
			</div>
			
		</div>
	)
}

export default About