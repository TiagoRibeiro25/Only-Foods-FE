import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './views/Home/Home';

function App() {
	return (
		<>
			<Router>
				<header>
					<Navbar />
				</header>
				<main className="max-w-screen-xl mx-auto mt-20 px-4">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<div>404</div>} />
					</Routes>
				</main>
			</Router>
		</>
	);
}

export default App;
