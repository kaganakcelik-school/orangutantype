import {
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'
// import ReactDOM from 'react-dom/client'

import Home from './components/Home.jsx'
import About from './components/About.jsx'
import SignIn from './components/SignIn.jsx'

const App = () => {
	return (
		<Router>
			<div>
				{/* <Link to='/about'>about</Link> */}
			</div>
			
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />}/>
				<Route path='/signin' element={<SignIn />}/>
			</Routes>

		
		</Router>
	)
}

export default App