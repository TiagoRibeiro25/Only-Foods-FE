import { useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import requests from './api/requests';
import { UserContext } from './contextProviders/user.context';
import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';
import Navigation from './navigation';
import Loading from './views/Loading';

function App() {
	const { setLoggedUser } = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	// Function to fetch logged user data
	const fetchLoggedUser = useCallback(async () => {
		try {
			const response = await requests.users.getLoggedUser();

			const user = response.data.data && {
				id: response.data.data.id,
				username: response.data.data.username,
				email: response.data.data.email,
				isAdmin: response.data.data.isAdmin,
				picture: response.data.data.userImage?.cloudinaryImage ?? undefined,
			};

			setLoggedUser(user ?? null);
		} catch (error) {
			console.log(error);
			setLoggedUser(null);
			setError(true);
		}

		setLoading(false);
	}, [setLoggedUser]);

	// Check if the user is logged in by sending a request to the server
	useEffect(() => {
		fetchLoggedUser();
	}, [fetchLoggedUser]);

	return (
		<>
			{loading || error ? (
				<Loading state={error ? 'error' : 'loading'} />
			) : (
				<Router>
					<header>
						<Navbar />
					</header>
					<main className="max-w-screen-xl min-h-screen px-4 mx-auto mt-20">
						<Navigation />
					</main>
					<Footer />
				</Router>
			)}
		</>
	);
}

export default App;
