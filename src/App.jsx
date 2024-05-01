import {
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'

import Home from './Home.jsx'
import About from './components/About.jsx'

const App = () => {
	return (
		<Router>
			<div>
				{/* <Link to='/about'>about</Link> */}
			</div>
			
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />}/>
			</Routes>

		
		</Router>
	)
}

export default App