import { useState } from 'react';
import { useParams } from 'react-router-dom';
import requests from '../../api/requests';
import LoadingIcon from '../../assets/icons/loading.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { validatePassword } from '../../utils/validateData';

// TODO: Add logic so that if the user is logged in, they can't access this page ( redirect to home )
const ResetPassword = () => {
	const params = useParams();
	const token = params.token as string;

	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [statusMsg, setStatusMsg] = useState<string>('Error Message');
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		// Validations
		if (!validatePassword(password)) {
			setStatusMsg(
				'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
			);
		} else {
			// Make the API call to reset the password
			const response = await requests.users.resetPassword({ token, password });
			setStatusMsg(response.data.message);

			if (response.data.success) {
				setPassword('');
				setConfirmPassword('');
			}
		}

		setLoading(false);
	};

	return (
		<div className="max-w-3xl mx-auto sm:mt-36 mt-28">
			<h1 className="mb-10 text-4xl text-center font-bellefair md:mt-2">
				Reset Password
			</h1>
			<p className="text-center text-gray-500 ">
				Enter your new password below. Your password must be at least 8 characters long
				and contain at least one uppercase letter, one lowercase letter, and one number.
			</p>

			<form className="flex flex-col gap-3 mt-16" onSubmit={handleSubmit}>
				<Input
					placeholder="New Password"
					type="password"
					name="confirm-password"
					id="password"
					required
					value={password}
					onChange={value => setPassword(value)}
				/>

				<Input
					placeholder="Confirm Password"
					type="password"
					name="confirm-password"
					id="confirm-password"
					required
					value={confirmPassword}
					onChange={value => setConfirmPassword(value)}
				/>

				<div className="w-full my-3 text-center">
					<p
						className="text-sm text-gray-950"
						style={{ visibility: statusMsg === 'Error Message' ? 'hidden' : 'visible' }}
					>
						{statusMsg}
					</p>
				</div>

				<div className="flex justify-center w-full">
					<Button
						type="submit"
						icon={loading ? LoadingIcon : ''}
						iconAlt="Loading Icon"
						iconAnimation="spin"
						disabled={loading || password.trim() === '' || password !== confirmPassword}
					>
						Update Password
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
