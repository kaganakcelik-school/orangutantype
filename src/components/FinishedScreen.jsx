import statsImage from './../assets/statsimage.png'

const FinishedScreen = props => {
	return (
		<div>
			<div className='flex flex-row p-10'>



				<div className='flex flex-col space-y-2'>
					<div>
						<p className='text-3xl text-stone-500'>
							wpm
						</p> 
						<p className='text-6xl text-yellow-400'>
							{Math.round(props.WPM)}
						</p>
					</div>

					<div>
						<p className='text-3xl text-stone-500'>
							accuracy
						</p> 
						<p className='text-6xl text-yellow-400'>
							idk
						</p>
					</div>
				</div>



				<div className='w-screen'>
					<img className='object-scale-down' src={statsImage}/>
				</div>
			</div>

			<div className='px-10'>
				<p className='text-3xl text-stone-500'>
					top score today
				</p> 
				<p className='text-6xl text-yellow-400'>
					{props.topScore}
				</p>
			</div>
		</div>
		
		
	)
}

export default FinishedScreen