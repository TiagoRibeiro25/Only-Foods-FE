import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { UserContext } from '../contextProviders/user.context';
import Feed from '../views/Feed';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import ResetPassword from '../views/ResetPassword';

const Navigation = () => {
	const { loggedUser } = useContext(UserContext);
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<Routes>
			<Route
				path="/"
				element={!loggedUser ? <Home /> : <Navigate to="/feed" replace />}
			/>
			<Route
				path="/reset-password/:token"
				element={!loggedUser ? <ResetPassword /> : <Navigate to="/404" replace />}
			/>
			<Route path="/feed" element={loggedUser ? <Feed /> : <Navigate to="/" replace />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Navigation;
