//flex flex-col justify-content items-center

const SettingsBar = props => {
	return (
		<div className='flex flex-col justify-content items-center'>

				<div className='flex flex-row justify-center space-x-4 bg-brown text-stone-100 py-2 rounded-xl sm:w-auto md:w-1/2 px-4'>
					<button onClick={() => props.toggleRandomWords()}>{props.randomWords ? 'sentences' : 'random words'}</button>
					<p> | </p>
					{props.randomWords ? 
						<div className='flex flex-row justify-center space-x-4'>
							<p>words:</p>
							<button onClick={() => props.changeWordCount(10)}>10</button>
							<button onClick={() => props.changeWordCount(30)}>30</button>
							<button onClick={() => props.changeWordCount(50)}>50</button> 
						</div>
						:
						<div>
							<p>sentence length coming soon</p>
						</div>
					}


				</div>


		</div>

	)
}

export default SettingsBar