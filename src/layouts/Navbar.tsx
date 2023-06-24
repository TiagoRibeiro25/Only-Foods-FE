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
		<nav className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg fixed top-0 w-full z-50">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
				<Link
					to={isUserLogged ? 'feed' : '/'}
					className="flex items-center"
					onMouseEnter={toggleLogoHovered}
					onMouseLeave={toggleLogoHovered}
				>
					<img
						src={isLogoHovered ? LogoHovered : Logo}
						alt="Social Eat Logo"
						width={32}
						height={32}
					/>
					<span className="font-bellefair self-center text-3xl font-semibold whitespace-nowrap mt-1">
						Social Eat
					</span>
				</Link>
				{isUserLogged && (
					<div className="flex items-center relative">
						<Link
							to="feed"
							className="md:block hidden text-gray-900 text-md font-semibold hover:text-gray-700 mr-4"
						>
							Feed
						</Link>
						<Link
							to="recipes"
							className="md:block hidden text-gray-900 text-md font-semibold hover:text-gray-700 mr-4"
						>
							Recipes
						</Link>
						<Link
							to="groups"
							className="md:block hidden text-gray-900 text-md font-semibold hover:text-gray-700 mr-4"
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
									className="absolute z-50 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow right-0"
									id="user-dropdown"
								>
									<div className="px-4 py-3">
										<span className="block text-sm text-gray-900">Tiago Ribeiro</span>
										<span className="block text-sm text-gray-500 truncate">
											tiago.d.ribeiro@hotmail.com
										</span>
									</div>
									<ul className="md:hidden block py-2" aria-labelledby="user-menu-button">
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
											<button className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
