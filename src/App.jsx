import { useState, useEffect, startTransition, useRef } from 'react'
import axios from 'axios'
import useCountup from './useCountup.jsx'
import logo from './assets/logokeybr.png'
import wordBank from './db.js'
import restartLogo from './assets/restartimage.png'
import FinishedScreen from './components/FinishedScreen.jsx'
import SettingsBar from './components/SettingsBar.jsx'

//
//https://random-word.ryanrk.com/api/en/word/random/10/?maxLength=7

const App = () => {
	
	const [words, setWords] = useState('')
	const [typedWords, setTypedWords] = useState('')
	const [gameFinished, setGameFinished] = useState(false)
	const [wordCount, setWordCount] = useState(10)
	
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
	}, [wordCount])

	const initializeWords = () => {
		let newWords = ''
		for (let i = 0; i < wordCount; i++) {
			newWords = newWords.concat(wordBank[Math.floor(Math.random() * wordBank.length)] + ' ')
		}
		setWords(newWords)
	}

	const calculateWPM = () => {
		// const arrayOfTypedWords = typedWords.split(' ')

		const arrayOfTypedWords = typedWords.split(' ')
		const arrayOfWords = words.split(' ')
		
		console.log(arrayOfTypedWords)
		console.log(arrayOfWords)
		
		let totalCar = 0
		for (let i = 0; i < arrayOfWords.length; i++) {
			if (arrayOfTypedWords[i] === arrayOfWords[i])
			{
				
				totalCar += arrayOfWords[i].length
			}
		}
		
		console.log(totalCar)
		return (((totalCar+(arrayOfTypedWords.length-1))/5)/(finalTime/60))
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
		if (newTypedWords.length === words.length-1 && !gameFinished) {
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
			<div className='flex flex-row px-14 space-x-2'>
				
				<img src={logo} className='w-12 h-7 my-5'/>
				<div className='flex flex-col -space-y-3'>
					<p className='text-stone-500 text-sm' >monkey write</p>
					<p className='text-5xl text-neutral-200'>orangutantype</p>
				</div>
				
			</div>
			
			
			
			
			
			
			<br/>
			{
				!gameFinished
					?
					<div>
						<SettingsBar changeWordCount={count => {setWordCount(count); restartGame()}}/>
						<div className='flex flex-row justify-center mx-40 my-10'>
							<div>
								{
									words.split('').map((char, index) => {
										return (<span 
														 key={index} 
														 className={`text-3xl font-mono ${currentChar === index ? 'underline decoration-green' : ''} ${currentChar-1 >= index ? `${typedWords.charAt(index) === words.charAt(index) ? 'text-stone-100' : 'text-red-600'}` : 'text-stone-500' }`}
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
					<img className='h-10' src={restartLogo}/>
				</button>
			</div>
			
		</div>
	)
}

export default App