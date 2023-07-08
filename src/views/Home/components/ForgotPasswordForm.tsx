import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingIcon from '../../../assets/icons/loading.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const ForgotPasswordForm = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
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

		console.log('Email: ', email);

		setTimeout(() => {
			setErrorMsg('Invalid email address');
			setLoading(false);
		}, 2000);
	};

	return (
		<>
			<h2 className="mb-6 text-3xl text-center font-bellefair md:mt-2">
				Forgot Password
			</h2>
			<p className="text-center">
				Enter your email address below and we'll send you a link to reset your password.
				If you don't receive an email, please make sure you've entered the address you
				registered with, and check your spam folder.
			</p>

			<form onSubmit={handleSubmit} className="mt-12">
				<Input
					placeholder="Email"
					type="email"
					name="email"
					id="email"
					required
					disabled={loading}
					onChange={value => setEmail(value)}
				/>

				<div className="w-full mt-12 mb-10 text-center">
					<p
						className="text-sm text-gray-950"
						style={{ visibility: errorMsg === 'Error Message' ? 'hidden' : 'visible' }}
					>
						{errorMsg}
					</p>
				</div>

				<div className="flex flex-row w-full">
					<div className="flex justify-center w-1/2">
						<Button
							type="reset"
							text="Cancel"
							backgroundColor="#FFFFFF"
							textColor="#050708"
							border={true}
							borderColor="#050708"
							padding="0.4rem 2.5rem"
							onClick={editUrlQuery}
							disabled={loading}
						/>
					</div>
					<div className="flex justify-center w-1/2">
						<Button
							type="submit"
							backgroundColor="#333333"
							textColor="#FFFFFF"
							text={loading ? 'Sending...' : 'Send'}
							border={false}
							padding={loading ? '0.4rem 1rem' : '0.4rem 3rem'}
							icon={loading ? LoadingIcon : ''}
							iconAlt="Loading Icon"
							iconAnimation="spin"
							disabled={loading}
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default ForgotPasswordForm;
