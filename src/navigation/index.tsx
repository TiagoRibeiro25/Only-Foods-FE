import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from '../contextProviders/user.context';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import ResetPassword from '../views/ResetPassword';

const Navigation = () => {
	const { loggedUser } = useContext(UserContext);

	return (
		<Routes>
			<Route
				path="/"
				element={!loggedUser ? <Home /> : <Navigate to="/feed" replace />}
			/>
			<Route path="/reset-password/:token" element={<ResetPassword />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Navigation;
