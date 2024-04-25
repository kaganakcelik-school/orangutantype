const SettingsBar = props => {
	return (
		<div className='flex flex-row justify-center space-x-10 bg-neutral-800 text-stone-500 mx-14 my-5'>
			<p>words:</p>
			<button onClick={() => props.changeWordCount(10)}>10</button>
			<button onClick={() => props.changeWordCount(30)}>30</button>
			<button onClick={() => props.changeWordCount(50)}>50</button>
		</div>
	)
}

export default SettingsBar