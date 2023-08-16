import classNames from 'classnames';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../contextProviders/UserContext';

const Footer = () => {
	const location = useLocation();
	const { loggedUser } = useContext(UserContext);

	return (
		<footer
			className={classNames(
				'w-full max-w-screen-xl p-4 mx-auto text-center lg:text-start lg:flex lg:items-center lg:justify-between',
				loggedUser || location.pathname === '/' ? 'mb-4' : 'mb-28',
			)}
		>
			<span className="text-gray-500 text-md lg:text-center">
				🍔 Only Foods - Where Taste Meets Adventure - Made with ♥️ by{' '}
				<a
					href="https://github.com/TiagoRibeiro25"
					className="hover:underline"
					target="_blank"
					rel="noreferrer"
				>
					Tiago Ribeiro
				</a>
			</span>
			<ul className="flex items-center justify-center mt-3 font-medium text-gray-500 text-md lg:flex-wrap lg:mt-0">
				<li className="mx-2 text-center">
					<a
						href="https://github.com/TiagoRibeiro25/Only-Foods-FE"
						className="w-full hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						Front End
					</a>
				</li>
				<li className="mx-2 text-center">
					<a
						href="https://github.com/TiagoRibeiro25/Only-Foods-BE"
						className=" hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						Back End
					</a>
				</li>
				<li className="mx-2 text-center">
					<a
						href="https://github.com/TiagoRibeiro25/Only-Foods-Docs"
						className=" hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						<span className="hidden sm:block">Documentation</span>
						<span className="block sm:hidden">Docs</span>
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
