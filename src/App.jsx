import { useState, useEffect, startTransition, useRef } from 'react'
import axios from 'axios'
import useCountup from './useCountup.jsx'
import logo from './assets/logo.png'
import sentenceBank from './data/sentencedb.js'
import wordBank from './data/worddb.js'
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
	const [finalTime, setFinalTime] = useState(0)
	const [topScore, setTopScore] = useState(0)
	const [correctWords, setCorrectWords] = useState([])
	const [randomWords, setRandomWords] = useState(false)

	const inputRef = useRef(null)

	const { timer, start } = useCountup()

	useEffect(() => {
		document.addEventListener('keydown', detectKeyDown, true)
		updateTopScore()
	}, [gameFinished])

	const updateTopScore = () => {
		axios
			.get('https://orangutantype-server.onrender.com/api/scores')
			.then(response => {
				setTopScore(Math.round(Math.max(...response.data.map(o => o.score))))
			})
	}

	const detectKeyDown = e => {
		if (isLetter(e.key))
		{
			inputRef.current.focus()
		}
	}

	const isLetter = (str) => {
		if (str.length === 1 && str.match(/[a-z]/i)) {
			return true
		}
		return false
	}

	useEffect(() => {
		initializeWords()
	}, [wordCount, randomWords])

	const initializeWords = () => {
		const rWords = randomWords 
		console.log('initializing words')
		if (rWords) {


			let newWords = ''
			for (let i = 0; i < wordCount; i++) {
				newWords = newWords.concat(wordBank[Math.floor(Math.random() * wordBank.length)] + ' ')
			}
			setWords(newWords)
			// setCorrectWords(Array.apply(null, Array(newWords.length)).map(function () {}))


		} else {
			const sentence = sentenceBank[Math.floor(Math.random() * sentenceBank.length)]



			let newSentence = sentence.split('')

			newSentence = newSentence.map(letter => letter.match(/^[ A-Za-z]+$/) ? letter : '')
			let newWords = ''
			for (let i = 0; i < newSentence.length; i++) {
				newWords = newWords.concat(newSentence[i])
			}
			newWords = newWords.toLowerCase()
			setWords(newWords)
			// setCorrectWords(Array.apply(null, Array(newWords.length)).map(function () {}))
		}

	}

	const calculateWPM = () => {
		// const arrayOfTypedWords = typedWords.split(' ')

		const arrayOfTypedWords = typedWords.split(' ')
		const arrayOfWords = words.split(' ')


		let totalCar = 0
		for (let i = 0; i < arrayOfWords.length; i++) {
			if (arrayOfTypedWords[i] === arrayOfWords[i])
			{

				totalCar += arrayOfWords[i].length
			}
		}

		const WPM = (((totalCar+(arrayOfTypedWords.length-1))/5)/(finalTime/60))

		const scoreObject = {
			score: WPM
		}

		axios
			.post('https://orangutantype-server.onrender.com/api/scores', scoreObject)
			.then(response => {
				updateTopScore()
			})

		return WPM
	}

	const handleTypeChange = event => {
		// console.log(correctWords[event.target.value.length-1])

		if (!(event.target.value.charAt(event.target.value.length-1) === words.charAt(event.target.value.length-1))) {

			let tempCorrectWords = correctWords
			tempCorrectWords[event.target.value.length-1] = false
			setCorrectWords(tempCorrectWords)
			console.log(tempCorrectWords)
			return
		}

		if (correctWords[event.target.value.length-1] !== false) {
			let tempCorrectWords = correctWords
			tempCorrectWords[event.target.value.length-1] = true
			setCorrectWords(tempCorrectWords)
		}

		setTypedWords(event.target.value)
		const newTypedWords = event.target.value

		setCurrentChar(event.target.value.length)


		if (typedWords.length === 0) {
			start(0)
		}

		if (newTypedWords.length === words.length-1 && !gameFinished) {
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
		setCorrectWords([])

		//vvv make this more clean
		inputRef.current.focus()
	}

	const switchRandomWords = () => {
		setRandomWords(!randomWords); 


		setGameFinished(false)
		setTypedWords('')
		setFinalTime(0)
		// initializeWords()
		setCurrentChar(0)
		setCorrectWords([])

		//vvv make this more clean
		inputRef.current.focus()

	}

	useEffect(() => {
		setInterval(() => {
			console.log(correctWords)
		}, 2000)
	}, [])

	return (
		<div>

			<div className='flex flex-row px-14 space-x-2 py-4'>

				<img src={logo} className='w-14 h-14'/>
				<div className='flex flex-col -space-y-3'>
					<p className='text-stone-500 text-sm' >monkey write</p>
					<p className='text-5xl text-brown'>orangutantype</p>
				</div>

			</div>

			<br/>

			{
				!gameFinished
					?
					<div>
						<SettingsBar changeWordCount={count => {setWordCount(count); restartGame()}} toggleRandomWords={switchRandomWords} randomWords={randomWords} />
						<div className='flex flex-row justify-center my-10'>
							<div className='w-3/4'>
								{
									words.split('').map((char, index) => {
										return (<span 
														 key={index} 
														 className={`text-3xl font-mono 
															${currentChar === index ? `underline  ${correctWords[index] === false ? '' : ''}` : ''} 
															${currentChar-1 >= index ?
																`${correctWords[index] === true ? 'text-stone-100' : 'text-red-600'}` : 
																'text-stone-500' }`}
														>
														{char}
														</span>)
									})
								}
							</div>
						</div>

					</div>
					:
					<FinishedScreen WPM={calculateWPM()} topScore={topScore}/>
			}
			<div>
				<input 
					className='opacity-0 z--900 absolute top-0'
					value={typedWords}
					onChange={handleTypeChange}
					ref={inputRef}
					/>
			</div>

			<div className='flex justify-center'>
				<button className="btn btn-square my-20" onClick={restartGame}>
					<img className='h-10' src={restartLogo}/>
				</button>
			</div>

		</div>
	)
}

export default App