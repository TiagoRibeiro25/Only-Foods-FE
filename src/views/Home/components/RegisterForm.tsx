import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingIcon from '../../../assets/icons/loading.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const RegisterForm = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errorMsg, setErrorMsg] = useState('Error Message');
	const [loading, setLoading] = useState(false);

	const editUrlQuery = () => {
		const searchParams = new URLSearchParams(location.search);
		searchParams.set('form', 'login');
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setErrorMsg('Error Message');

		console.log('Registering...');
		console.log('Username:', username);
		console.log('Email:', email);
		console.log('Password', password);
		console.log('Confirm Password', confirmPassword);

		if (password !== confirmPassword) {
			setLoading(false);
			setErrorMsg("Passwords don't match");
			return;
		}

		//TODO: Add register logic here
		setTimeout(() => {
			setLoading(false);
			setErrorMsg("There's already an account with that email");
		}, 2000);
	};

	return (
		<>
			<h2 className="mb-6 text-3xl text-center font-bellefair md:mt-2">Create Account</h2>

			<form onSubmit={handleSubmit}>
				<Input
					placeholder="Username"
					type="text"
					name="username"
					id="username"
					required
					disabled={loading}
					value={username}
					onChange={value => setUsername(value)}
				/>

				<Input
					placeholder="Email"
					type="email"
					name="email"
					id="email"
					required
					disabled={loading}
					value={email}
					onChange={value => setEmail(value)}
				/>

				<div className="flex flex-row">
					<div className="w-1/2 pr-4">
						<Input
							placeholder="Password"
							type="password"
							name="password"
							id="password"
							required
							disabled={loading}
							value={password}
							onChange={value => setPassword(value)}
						/>
					</div>
					<div className="w-1/2 pl-4">
						<Input
							placeholder="Confirm Password"
							type="password"
							name="confirm-password"
							id="confirm-password"
							required
							disabled={loading}
							value={confirmPassword}
							onChange={value => setConfirmPassword(value)}
						/>
					</div>
				</div>

				<div className="w-full mt-1 mb-5 text-center">
					<p
						className="text-sm text-gray-950"
						style={{ visibility: errorMsg === 'Error Message' ? 'hidden' : 'visible' }}
					>
						{errorMsg}
					</p>
				</div>

				<div className="w-full text-center">
					<Button
						type="submit"
						padding={loading ? '0.4rem 2.5rem' : '0.4rem 4rem'}
						icon={loading ? LoadingIcon : ''}
						iconAlt="Loading Icon"
						iconAnimation="spin"
						disabled={loading}
					>
						{loading ? 'Signing Up' : 'Sign Up'}
					</Button>
				</div>
			</form>

			<div className="w-full mt-5 mb-10 text-center">
				<p className="text-sm text-gray-950">
					Already have an account?{' '}
					<span className="underline cursor-pointer" onClick={editUrlQuery}>
						Sign In
					</span>
				</p>
			</div>
		</>
	);
};

export default RegisterForm;
