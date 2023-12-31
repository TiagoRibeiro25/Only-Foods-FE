import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import requests from '../../api/requests';
import ExploreIcon from '../../assets/icons/search.svg';
import UserNoPicture from '../../assets/imgs/user.webp';
import Logo from '../../assets/logo/logo_bw_1.webp';
import LogoHovered from '../../assets/logo/logo_color_2.webp';
import ConfirmActionModal from '../../components/ConfirmActionModal';
import { RecipesContext } from '../../contextProviders/RecipesContext';
import { ThoughtsContext } from '../../contextProviders/ThoughtsContext';
import { UserContext } from '../../contextProviders/UserContext';

const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loggedUser, setLoggedUser } = useContext(UserContext);
	const thoughtsContext = useContext(ThoughtsContext);
	const recipesContext = useContext(RecipesContext);

	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
	const [isLogoHovered, setLogoHovered] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = (): void => setMenuOpen(!isMenuOpen);
	const toggleLogoHovered = (newValue: boolean): void => setLogoHovered(newValue);

	const getUserStatus = (): string => {
		if (loggedUser?.isAdmin) {
			return '- Admin User -';
		}

		if (loggedUser?.isBlocked) {
			return '- Blocked User -';
		}

		return '- Normal User -';
	};

	const signOut = async (): Promise<void> => {
		setShowModal(false);

		try {
			const response = await requests.users.logout();

			if (response.data.success) {
				// Remove the logged user from the context
				setLoggedUser(null);

				// Reset all thoughts state
				thoughtsContext.resetAllState();

				// Reset all recipes state
				recipesContext.resetAllState();

				// Navigate to the home page
				navigate('/');
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			navigate('/');
			window.location.reload();
		}
	};

	useEffect(() => {
		// Preload both logo images on component load
		const preloadImages = [Logo, LogoHovered];
		preloadImages.forEach(imageUrl => {
			const img = new Image();
			img.src = imageUrl;
		});

		const handleClickOutside = (event: MouseEvent): void => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	// Close the menu when the user navigates to another page
	useEffect(() => {
		setMenuOpen(false);
	}, [location.pathname]);

	return (
		<nav className="fixed top-0 z-50 w-full bg-white bg-opacity-95 backdrop-filter">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
				<Link
					to={loggedUser ? 'feed' : '/'}
					className="flex items-center"
					onMouseEnter={() => toggleLogoHovered(true)}
					onMouseLeave={() => toggleLogoHovered(false)}
					onClick={() => window.scrollTo(0, 0)}
				>
					<img
						src={isLogoHovered ? LogoHovered : Logo}
						alt="Only Foods Logo"
						width={32}
						height={32}
					/>
					<span className="self-center mt-1 text-3xl font-semibold font-bellefair whitespace-nowrap">
						Only Foods
					</span>
				</Link>
				<div className="relative flex items-center">
					{loggedUser ? (
						<>
							<Link
								to="feed"
								className={classNames(
									'hidden mr-4 font-semibold text-gray-900 md:block text-md hover:text-gray-700',
									{ 'underline underline-offset-2': location.pathname === '/feed' },
								)}
							>
								Feed
							</Link>
							<Link
								to="recipes"
								className={classNames(
									'hidden mr-4 font-semibold text-gray-900 md:block text-md hover:text-gray-700',
									{
										'underline underline-offset-2':
											location.pathname.split('/')[1] === 'recipes',
									},
								)}
							>
								Recipes
							</Link>
							<Link
								to="search"
								className={classNames(
									'hidden mr-4 font-semibold text-gray-900 md:block text-md hover:text-gray-700',
									{ 'underline underline-offset-2': location.pathname === '/search' },
								)}
							>
								Search
							</Link>

							<div className="relative" ref={menuRef}>
								<button
									type="button"
									className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
									id="user-menu-button"
									aria-expanded={isMenuOpen}
									onClick={toggleMenu}
								>
									<span className="sr-only">Open user menu</span>
									<LazyLoadImage
										className="object-cover object-center w-8 h-8 rounded-full"
										src={loggedUser.picture ?? UserNoPicture}
										alt="user photo"
										effect="blur"
									/>
								</button>
								{isMenuOpen && (
									<div
										className="absolute right-0 z-50 w-48 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow bg-opacity-70 backdrop-filter backdrop-blur-lg"
										id="user-dropdown"
									>
										<div className="px-4 py-3">
											<span className="block text-sm text-gray-900">
												{loggedUser.username}
											</span>
											<Marquee
												className="block text-sm text-gray-500 truncate"
												speed={33}
												pauseOnHover
											>
												{loggedUser.email}
												<span className="mx-1">{getUserStatus()}</span>
											</Marquee>
										</div>
										<ul
											className="block py-2 md:hidden"
											aria-labelledby="user-menu-button"
										>
											<li>
												<Link
													to="feed"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Feed
												</Link>
												<Link
													to="recipes"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Recipes
												</Link>
												<Link
													to="search"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Search
												</Link>
											</li>
										</ul>
										<ul className="py-2" aria-labelledby="user-menu-button">
											<li>
												<Link
													to="user/me"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Profile
												</Link>
											</li>
											<li>
												<Link
													to="messages"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Messages
												</Link>
											</li>
											<li>
												<button
													className="block w-full px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100"
													onClick={() => {
														setShowModal(true);
														setMenuOpen(false);
													}}
												>
													Sign out
												</button>
											</li>
										</ul>
									</div>
								)}
							</div>
						</>
					) : (
						<Link
							to="/explore"
							className={classNames(
								'flex flex-row mr-1 font-semibold text-gray-900 text-md hover:text-gray-700',
								location.pathname === '/explore' && 'hidden',
							)}
						>
							<span className="flex items-center justify-center">
								<img
									className="w-6 h-6 sm:mr-1 sm:w-4 sm:h-4"
									src={ExploreIcon}
									alt="Explore"
								/>
							</span>
							<span className="hidden pt-1 text-xl sm:block font-bellefair">Explore</span>
						</Link>
					)}
				</div>
			</div>
			<hr className="max-w-screen-xl mx-auto border-black border-opacity-50 border-1" />

			<ConfirmActionModal
				id="confirm-sign-out"
				message="Are you sure you want to sign out?"
				onConfirm={signOut}
				onCancel={() => setShowModal(false)}
				show={showModal}
			/>
		</nav>
	);
};

export default Navbar;
