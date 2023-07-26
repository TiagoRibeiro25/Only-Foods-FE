import { useState } from 'react';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import requests from '../../../../api/requests';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { validatePassword } from '../../../../utils/validateData';

const RegisterForm = () => {
	const location: Location = useLocation();
	const navigate: NavigateFunction = useNavigate();

	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const [statusMsg, setStatusMsg] = useState<string>('Error Message');
	const [loading, setLoading] = useState<boolean>(false);

	const editUrlQuery = (): void => {
		const searchParams = new URLSearchParams(location.search);
		searchParams.set('form', 'login');
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		setStatusMsg('Error Message');

		if (password !== confirmPassword) {
			setLoading(false);
			setStatusMsg("Passwords don't match");
			return;
		}

		if (!validatePassword(password)) {
			setLoading(false);
			setStatusMsg(
				'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
			);
			return;
		}

		try {
			// Attempt to create a new account
			const response = await requests.users.register({ username, email, password });

			// If the account was created successfully, clear the input fields
			if (response.data.success) {
				setUsername('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');
			}

			setStatusMsg(response.data.message);
		} catch (error) {
			console.error(error);
			setStatusMsg('An error occurred. Please try again.');
		}

		setLoading(false);
	};

	return (
		<>
			<h2 className="text-3xl text-center mb-14 font-bellefair md:mt-2">
				Create Account
			</h2>

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
						style={{ visibility: statusMsg === 'Error Message' ? 'hidden' : 'visible' }}
					>
						{statusMsg}
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
