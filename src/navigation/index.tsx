import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { UserContext } from '../contextProviders/UserContext';
import AddRecipe from '../views/AddRecipe';
import AdminPanel from '../views/AdminPanel';
import Explore from '../views/Explore';
import Feed from '../views/Feed';
import Home from '../views/Home';
import Messages from '../views/Messages';
import NotFound from '../views/NotFound';
import Recipe from '../views/Recipe';
import Recipes from '../views/Recipes';
import ResetPassword from '../views/ResetPassword';
import Search from '../views/Search';
import ThoughtPost from '../views/ThoughtPost';
import User from '../views/User';

const Navigation = () => {
	const { loggedUser } = useContext(UserContext);
	const location = useLocation();

	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

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
			<Route path="/explore" element={<Explore />} />
			<Route path="/feed" element={<Feed />} />
			<Route path="/thought/:id" element={<ThoughtPost />} />
			<Route path="/recipes" element={<Navigate to={'/recipes/all'} replace />} />
			<Route path="/recipes/add" element={<AddRecipe />} />
			<Route path="/recipes/:tab" element={<Recipes />} />
			<Route path="/recipe/:id" element={<Recipe />} />
			<Route path="/search" element={<Search />} />
			<Route path="/user/:id" element={<User />} />
			<Route path="/messages" element={<Messages />} />
			<Route path="/admin" element={<AdminPanel />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Navigation;
