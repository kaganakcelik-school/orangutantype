const SettingsBar = props => {
	return (
		<div className='flex flex-col justify-content items-center'>

				<div className='flex flex-row justify-center space-x-4 bg-brown text-stone-100 py-2 rounded-xl w-1/2'>
					<button onClick={() => props.toggleRandomWords()}>toggle random words</button>
					<p> | </p>
					<p>words:</p>
					<button onClick={() => props.changeWordCount(10)}>10</button>
					<button onClick={() => props.changeWordCount(30)}>30</button>
					<button onClick={() => props.changeWordCount(500)}>50</button>

				</div>
			
			
		</div>
		
	)
}

export default SettingsBar