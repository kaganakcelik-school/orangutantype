import statsImage from './../assets/statsimage.png'

const FinishedScreen = props => {
	return (
		<div>
			<div className='flex flex-row p-10 justify-center'>

					<div>
						<p className='text-3xl text-stone-500'>
							wpm
						</p> 
						<p className='text-6xl text-yellow-400'>
							{Math.round(props.WPM)}
						</p>
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


		</div>


	)
}

export default FinishedScreen