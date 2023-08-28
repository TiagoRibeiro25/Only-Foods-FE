import { Suspense, lazy, useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { UserContext } from '../contextProviders/UserContext';
import ProfileEdit from '../views/ProfileEdit';
import SearchUsers from '../views/SearchUsers';

const AddRecipe = lazy(() => import('../views/AddRecipe'));
const Explore = lazy(() => import('../views/Explore'));
const Feed = lazy(() => import('../views/Feed'));
const Home = lazy(() => import('../views/Home'));
const Messages = lazy(() => import('../views/Messages'));
const NotFound = lazy(() => import('../views/NotFound'));
const Recipe = lazy(() => import('../views/Recipe'));
const Recipes = lazy(() => import('../views/Recipes'));
const ResetPassword = lazy(() => import('../views/ResetPassword'));
const Search = lazy(() => import('../views/Search'));
const ThoughtPost = lazy(() => import('../views/ThoughtPost'));
const User = lazy(() => import('../views/User'));

const Navigation = () => {
	const { loggedUser } = useContext(UserContext);
	const location = useLocation();

	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<Suspense
			fallback={
				<div className="flex items-center" style={{ height: 'calc(100vh - 120px)' }}>
					<Loading />
				</div>
			}
		>
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
				<Route
					path="/recipes/add"
					element={loggedUser ? <AddRecipe /> : <Navigate to="/" replace />}
				/>
				<Route path="/recipes/:tab" element={<Recipes />} />
				<Route path="/recipe/:id" element={<Recipe />} />
				<Route path="/search" element={<Search />} />
				<Route path="/users/search" element={<SearchUsers />} />
				<Route path="/user/:id" element={<User />} />
				<Route
					path="/profile/edit"
					element={loggedUser ? <ProfileEdit /> : <Navigate to="/?form=login" replace />}
				/>
				<Route path="/messages" element={<Messages />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
};

export default Navigation;
