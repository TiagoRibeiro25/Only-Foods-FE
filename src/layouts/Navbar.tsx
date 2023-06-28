import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../assets/imgs/user.png';
import Logo from '../assets/logo/logo_bw_1.png';
import LogoHovered from '../assets/logo/logo_color_2.png';

const Navbar = () => {
	const [isUserLogged, setUserLogged] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isLogoHovered, setLogoHovered] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => setMenuOpen(!isMenuOpen);
	const toggleLogoHovered = () => setLogoHovered(!isLogoHovered);

	useEffect(() => {
		setUserLogged(false);

		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<nav className="fixed top-0 z-50 w-full bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
				<Link
					onClick={() => window.scrollTo(0, 0)}
					to={isUserLogged ? 'feed' : '/'}
					className="flex items-center"
					onMouseEnter={toggleLogoHovered}
					onMouseLeave={toggleLogoHovered}
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
				{isUserLogged && (
					<div className="relative flex items-center">
						<Link
							to="feed"
							className="hidden mr-4 font-semibold text-gray-900 md:block text-md hover:text-gray-700"
						>
							Feed
						</Link>
						<Link
							to="recipes"
							className="hidden mr-4 font-semibold text-gray-900 md:block text-md hover:text-gray-700"
						>
							Recipes
						</Link>
						<Link
							to="groups"
							className="hidden mr-4 font-semibold text-gray-900 md:block text-md hover:text-gray-700"
						>
							Groups
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
								<img className="w-8 h-8 rounded-full" src={User} alt="user photo" />
							</button>
							{isMenuOpen && (
								<div
									className="absolute right-0 z-50 w-48 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow bg-opacity-70 backdrop-filter backdrop-blur-lg"
									id="user-dropdown"
								>
									<div className="px-4 py-3">
										<span className="block text-sm text-gray-900">Tiago Ribeiro</span>
										<span className="block text-sm text-gray-500 truncate">
											tiago.d.ribeiro@hotmail.com
										</span>
									</div>
									<ul className="block py-2 md:hidden" aria-labelledby="user-menu-button">
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
												to="groups"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Groups
											</Link>
										</li>
									</ul>
									<ul className="py-2" aria-labelledby="user-menu-button">
										<li>
											<Link
												to="profile"
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
											<button className="block w-full px-4 py-2 text-sm text-gray-700 text-start hover:bg-gray-100">
												Sign out
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			<hr className="max-w-screen-xl mx-auto border-black border-opacity-50 border-1" />
		</nav>
	);
};

export default Navbar;
