const SettingsBar = props => {
	return (
		<div className='flex flex-col justify-content items-center'>
			<div className='flex flex-row justify-center space-x-10 bg-brown text-stone-100 py-2 rounded-xl w-1/2'>
				<p>words:</p>
				<button onClick={() => props.changeWordCount(10)}>10</button>
				<button onClick={() => props.changeWordCount(30)}>30</button>
				<button onClick={() => props.changeWordCount(50)}>50</button>
			</div>
		</div>
		
	)
}

export default SettingsBar