import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Navigation from './navigation';
import store from './redux/index';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<header>
					<Navbar />
				</header>
				<main className="max-w-screen-xl px-4 mx-auto mt-20">
					<Navigation />
				</main>
			</Router>
		</Provider>
	);
}

export default App;
