import statsImage from './../assets/statsimage.png'

const FinishedScreen = props => {
	return (
		<div>
			<div className='flex flex-row p-10 justify-center space-x-10'>

					<div>
						<p className='text-3xl text-stone-500'>
							wpm
						</p> 
						<p className='text-6xl text-yellow-400'>
							{Math.round(props.WPM)}
						</p>
					</div>

					<div className=''>
						<p className='text-3xl text-stone-500'>
							accuracy
						</p> 
						<p className='text-6xl text-yellow-400'>
							{Math.round(props.accuracy)}
						</p>
					</div>

					<div className=''>
						<p className='text-3xl text-stone-500'>
							top score
						</p> 
						<p className='text-6xl text-yellow-400'>
							{props.topScore}
							<span className='text-stone-500 text-sm px-2'>by {props.topScoreName}</span>
						</p>
					</div>

			</div>


		</div>


	)
}

export default FinishedScreen