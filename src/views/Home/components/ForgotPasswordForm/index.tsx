import classNames from 'classnames';
import { useState } from 'react';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import requests from '../../../../api/requests';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

const ForgotPasswordForm: React.FC = () => {
	const location: Location = useLocation();
	const navigate: NavigateFunction = useNavigate();

	const [email, setEmail] = useState<string>('');
	const [statusMsg, setStatusMsg] = useState<string>('');
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
		setStatusMsg('');

		try {
			const response = await requests.users.forgotPassword(email);

			// If the email was sent successfully, clear the input field
			if (response.data.success) {
				setEmail('');
			}

			setStatusMsg(response.data.message);
		} catch (error) {
			console.log(error);
			setStatusMsg('An error occurred. Please try again.');
		}

		setLoading(false);
	};

	return (
		<>
			<h2 className="text-3xl text-center mb-14 font-bellefair md:mt-2">
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
					autoComplete="login-email"
					required
					disabled={loading}
					value={email}
					onChange={value => setEmail(value)}
				/>

				<div className="w-full mt-12 mb-10 text-center">
					<p
						className="text-sm text-gray-950"
						style={{ visibility: statusMsg === '' ? 'hidden' : 'visible' }}
					>
						{statusMsg}
					</p>
				</div>

				<div className="flex flex-row w-full mb-10">
					<div className="flex justify-center w-1/2">
						<Button
							type="reset"
							id="forgot-password-cancel"
							className="text-black bg-white border border-zinc-800 px-10 py-1.5"
							onClick={editUrlQuery}
							disabled={loading}
						>
							Cancel
						</Button>
					</div>
					<div className="flex justify-center w-1/2">
						<Button
							type="submit"
							id="forgot-password-submit"
							className={classNames(
								'text-white bg-zinc-800 py-1.5',
								loading ? 'px-8' : 'px-12',
							)}
							icon={loading ? LoadingIcon : ''}
							iconAlt="Loading Icon"
							iconAnimation="spin"
							disabled={loading}
						>
							{loading ? 'Sending' : 'Send'}
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default ForgotPasswordForm;
