const Footer = () => {
	return (
		<footer className="w-full max-w-screen-xl p-4 mx-auto mb-4 text-center lg:text-start lg:flex lg:items-center lg:justify-between">
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
				<li>
					<a
						href="https://github.com/TiagoRibeiro25/Only-Foods-FE"
						className="mr-4 hover:underline lg:mr-6 "
						target="_blank"
						rel="noreferrer"
					>
						Front End
					</a>
				</li>
				<li>
					<a
						href="https://github.com/TiagoRibeiro25/Only-Foods-BE"
						className="mr-4 hover:underline lg:mr-6"
						target="_blank"
						rel="noreferrer"
					>
						Back End
					</a>
				</li>
				<li>
					<a
						href="https://github.com/TiagoRibeiro25/Only-Foods-Docs"
						className="mr-4 hover:underline lg:mr-6"
						target="_blank"
						rel="noreferrer"
					>
						Documentation
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
