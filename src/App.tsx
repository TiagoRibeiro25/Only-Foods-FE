import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Navigation from './navigation';

function App() {
	return (
		<Router>
			<header>
				<Navbar />
			</header>
			<main className="max-w-screen-xl px-4 mx-auto mt-20">
				<Navigation />
			</main>
		</Router>
	);
}

export default App;
