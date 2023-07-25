import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import ResetPassword from '../views/ResetPassword';

const Navigation = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/reset-password/:token" element={<ResetPassword />} />'
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Navigation;
