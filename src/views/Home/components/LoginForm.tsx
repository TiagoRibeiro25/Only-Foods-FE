import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingIcon from '../../../assets/icons/loading.svg';
import Button from '../../../components/Button';
import CheckBox from '../../../components/CheckBox';
import Input from '../../../components/Input';

const LoginForm = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	const [errorMsg, setErrorMsg] = useState('Error Message');
	const [loading, setLoading] = useState(false);

	const editUrlQuery = (value: 'register' | 'forgotPassword') => {
		const searchParams = new URLSearchParams(location.search);
		searchParams.set('form', value);
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setErrorMsg('Error Message');

		console.log('Logging in...');
		console.log('Email:', email);
		console.log('Password', password);
		console.log('Remember Me:', rememberMe);

		//TODO: Add login logic here
		setTimeout(() => {
			setLoading(false);
			setErrorMsg('Invalid email or password');
		}, 2000);
	};

	return (
		<>
			<h2 className="mb-6 text-3xl text-center font-bellefair md:mt-2">Login</h2>

			<form onSubmit={handleSubmit}>
				<Input
					placeholder="Email"
					type="email"
					name="email"
					id="email"
					required
					disabled={loading}
					onChange={value => setEmail(value)}
				/>

				<Input
					placeholder="Password"
					type="password"
					name="password"
					id="password"
					required
					disabled={loading}
					onChange={value => setPassword(value)}
				/>

				<CheckBox
					placeholder="Remember me"
					id="remember-me"
					disabled={loading}
					onChange={value => setRememberMe(value)}
				/>

				<div className="w-full my-5 text-center">
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
						backgroundColor="#333333"
						textColor="#FFFFFF"
						text={loading ? 'Signing In' : 'Sign In'}
						padding={loading ? '0.4rem 2.5rem' : '0.4rem 4rem'}
						icon={loading ? LoadingIcon : ''}
						iconAlt="Loading Icon"
						iconAnimation="spin"
						disabled={loading}
					/>
				</div>
			</form>

			<div className="w-full mt-5 text-center">
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
