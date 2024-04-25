import statsImage from './../assets/statsimage.png'

const FinishedScreen = props => {
	return (
		<div className='flex flex-row p-10'>
			<div>
				<p className='text-3xl text-stone-500'>
					wpm
				</p> 
				<p className='text-6xl text-yellow-400'>
					{Math.round(props.WPM)}
				</p>
			</div>
			<div className='w-screen'>
				<img className='object-scale-down' src={statsImage}/>
			</div>
		</div>
		
	)
}

export default FinishedScreen