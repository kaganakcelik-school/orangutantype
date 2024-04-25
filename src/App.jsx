import { useState, useEffect, startTransition, useRef } from 'react'
import axios from 'axios'
import useCountup from './useCountup.jsx'
import logo from './assets/logokeybr.png'
import wordBank from './db.js'
import restartLogo from './assets/restartimage.png'
import FinishedScreen from './components/FinishedScreen.jsx'

//
//https://random-word.ryanrk.com/api/en/word/random/10/?maxLength=7

const App = () => {
	
	const [words, setWords] = useState('')
	const [typedWords, setTypedWords] = useState('')
	const [gameFinished, setGameFinished] = useState(false)

	const [currentChar, setCurrentChar] = useState(0)
	
	const inputRef = useRef(null)
	
	const [finalTime, setFinalTime] = useState(0)
	
	const { timer, start } = useCountup()

	useEffect(() => {
		document.addEventListener('keydown', detectKeyDown, true)
	}, [])

	const detectKeyDown = e => {
		if (isLetter(e.key))
		{
			// console.log('a')
			if (!gameFinished) inputRef.current.focus()
		}
	}

	function isLetter(str) {
		if (str.length === 1 && str.match(/[a-z]/i)) {
			return true
		}
		return false
	}
	
	useEffect(() => {
		initializeWords()
	}, [])

	const initializeWords = () => {
		let newWords = ''
		for (let i = 0; i < 10; i++) {
			// newWords = [...newWords, wordBank[Math.floor(Math.random() * wordBank.length)]]
			newWords = newWords.concat(wordBank[Math.floor(Math.random() * wordBank.length)] + ' ')
		}
		setWords(newWords)
	}

	const calculateWPM = () => {
		// const arrayOfTypedWords = typedWords.split(' ')

		let totalCar = 0
		for (let i = 0; i < words.length; i++) {
			if (typedWords.charAt(i) === words.charAt(i))
			{
				totalCar += 1
			}
		}
		return (((totalCar)/5)/(finalTime/60))
	}

	const handleTypeChange = event => {
		setTypedWords(event.target.value)
		const newTypedWords = event.target.value
		const arrayOfTypedWords = typedWords.split(' ')
		const checkWords = event.target.value.split('')

		setCurrentChar(event.target.value.length)
		
		if (typedWords.length === 0) {
			console.log('started')
			start(0)
		}
		//not working yet cuz of the if thing below this second conditional not working cuz yea
		// if (arrayOfTypedWords.length === words.length && arrayOfTypedWords[9] === words[9] && !gameFinished) {
		// 	console.log('you typed all the words')
		// 	setGameFinished(true)
		// 	setFinalTime(timer)
		// 	start(null)
		// }
		
		// let stringWords = ''
		// words.forEach(word => {stringWords = stringWords.concat(word + ' ')})
		// console.log(newTypedWords.length, stringWords.length)
		if (newTypedWords.length === words.length && !gameFinished) {
				console.log('finished')
				setGameFinished(true)
				setFinalTime(timer)
				start(null)
		}
	}	

	const restartGame = () => {
		setGameFinished(false)
		setTypedWords('')
		setFinalTime(0)
		initializeWords()
		setCurrentChar(0)

		//vvv make this more clean
		inputRef.current.focus()
	}
	
	return (
		<div>
			{currentChar}
			<div className='flex flex-row px-8 py-2 spacex-2'>
				
				<img src={logo} className='w-12'/>

				<h1 className='text-5xl px-2 text-neutral-200'>orangutan type</h1>
			</div>
			
			<p className='text-sm text-center'>u cant change the settings yet ill add it later</p>
			
			
			
			
			<br/>
			{
				!gameFinished
					?
					<div>
						<div className='flex flex-row justify-center'>
							<div>
								{
									words.split('').map((char, index) => {
										return (<span 
														 key={index} 
														 className={`text-3xl ${currentChar === index ? 'underline decoration-green' : ''} ${currentChar-1 >= index ? `${typedWords.charAt(index) === words.charAt(index) ? 'text-stone-100' : 'text-red-600'}` : 'text-stone-500' }`}
														>
														{char}
														</span>)
									})
								}
							</div>
						</div>
						
						<div>
							<input 
								className='opacity-0 z--900 absolute'
								value={typedWords}
								onChange={handleTypeChange}
								ref={inputRef}
								autoFocus
								/>
						</div>
					</div>
					:
					<FinishedScreen WPM={calculateWPM()}/>
			}

			<div className='flex justify-center'>
				<button className="btn btn-square my-20" onClick={restartGame}>
					<img className='w-20 h-20' src={restartLogo}/>
				</button>
			</div>
			
		</div>
	)
}

export default App