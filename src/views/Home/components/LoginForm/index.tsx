import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import requests from '../../../../api/requests';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import Button from '../../../../components/Button';
import CheckBox from '../../../../components/CheckBox';
import Input from '../../../../components/Input';
import { ThoughtsContext } from '../../../../contextProviders/ThoughtsContext';
import { UserContext } from '../../../../contextProviders/UserContext';

const LoginForm = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { setLoggedUser } = useContext(UserContext);
	const thoughtsContext = useContext(ThoughtsContext);

	// Login Form State Management
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	// API Request State Management
	const [statusMsg, setStatusMsg] = useState<string>('Error Message');
	const [loading, setLoading] = useState<boolean>(false);

	const editUrlQuery = (value: 'register' | 'forgotPassword'): void => {
		const searchParams = new URLSearchParams(location.search);
		searchParams.set('form', value);
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		setStatusMsg('Error Message');

		try {
			const response = await requests.users.login({ email, password, rememberMe });

			if (response.data.success) {
				// Reset all thoughts state
				thoughtsContext.resetAllState();

				setLoggedUser(response.data.data?.user ?? null);
			} else {
				setStatusMsg(response.data.message);
			}
		} catch (error) {
			console.log(error);
			setStatusMsg('An error occurred. Please try again.');
		}

		setLoading(false);
	};

	return (
		<>
			<h2 className="text-3xl text-center mb-14 font-bellefair md:mt-2">Login</h2>

			<form onSubmit={handleSubmit}>
				<Input
					placeholder="Email"
					type="email"
					name="email"
					id="email"
					autoComplete="login-email"
					required
					disabled={loading}
					value={email}
					onChange={value => setEmail(value)}
				/>

				<Input
					placeholder="Password"
					type="password"
					name="password"
					id="password"
					autoComplete="login-password"
					required
					disabled={loading}
					value={password}
					onChange={value => setPassword(value)}
				/>

				<CheckBox
					placeholder="Remember me"
					id="remember-me"
					name="remember-me"
					disabled={loading}
					onChange={value => setRememberMe(value)}
				/>

				<div className="w-full my-5 text-center">
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
						{loading ? 'Signing In' : 'Sign In'}
					</Button>
				</div>
			</form>

			<div className="w-full mt-5 mb-16 text-center">
				<p className="text-sm text-gray-950">
					Don't have an account?{' '}
					<span
						className="underline cursor-pointer"
						onClick={() => editUrlQuery('register')}
					>
						Sign Up
					</span>
					<br className="my-1" />
					<span
						className="underline cursor-pointer"
						onClick={() => editUrlQuery('forgotPassword')}
					>
						Forgot password?
					</span>
				</p>
			</div>
		</>
	);
};

export default LoginForm;
