import { useState } from 'react';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import requests from '../../../api/requests';
import LoadingIcon from '../../../assets/icons/loading.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const ForgotPasswordForm = () => {
	const location: Location = useLocation();
	const navigate: NavigateFunction = useNavigate();

	const [email, setEmail] = useState<string>('');
	const [statusMsg, setStatusMsg] = useState<string>('Error Message');
	const [loading, setLoading] = useState<boolean>(false);

	const editUrlQuery = (): void => {
		const searchParams = new URLSearchParams(location.search);
		searchParams.set('form', 'login');
		navigate(`${location.pathname}?${searchParams.toString()}`);
	};

	// API call to send email
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		setStatusMsg('Error Message');

		try {
			const response = await requests.users.forgotPassword(email);

			// If the email was sent successfully, clear the input field
			if (response.data.success) {
				setEmail('');
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
					value={email}
					onChange={value => setEmail(value)}
				/>

				<div className="w-full mt-12 mb-10 text-center">
					<p
						className="text-sm text-gray-950"
						style={{ visibility: statusMsg === 'Error Message' ? 'hidden' : 'visible' }}
					>
						{statusMsg}
					</p>
				</div>

				<div className="flex flex-row w-full mb-10">
					<div className="flex justify-center w-1/2">
						<Button
							type="reset"
							backgroundColor="#FFFFFF"
							textColor="#050708"
							border={true}
							borderColor="#050708"
							padding="0.4rem 2.5rem"
							onClick={editUrlQuery}
							disabled={loading}
						>
							Cancel
						</Button>
					</div>
					<div className="flex justify-center w-1/2">
						<Button
							type="submit"
							border={false}
							padding={loading ? '0.4rem 1rem' : '0.4rem 3rem'}
							icon={loading ? LoadingIcon : ''}
							iconAlt="Loading Icon"
							iconAnimation="spin"
							disabled={loading}
						>
							{loading ? 'Sending...' : 'Send'}
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default ForgotPasswordForm;
