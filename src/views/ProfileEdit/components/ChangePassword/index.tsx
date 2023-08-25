import React, { useState } from 'react';
import requests from '../../../../api/requests';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Reveal from '../../../../components/Reveal';

interface ChangePasswordProps {
	resetPasswordToken: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ resetPasswordToken }) => {
	const [token, setToken] = useState<string>(resetPasswordToken);
	const [newPassword, setNewPassword] = useState<string>('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [statusMsg, setStatusMsg] = useState<string>('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		setIsLoading(true);
		setStatusMsg('');

		try {
			const response = await requests.users.resetPassword({
				password: newPassword,
				token: token,
			});

			// Get the updated token (in case the user wants to change their password again)
			if (response.data.success) {
				const newResponse = await requests.users.getLoggedUser();
				if (newResponse.data.success && newResponse.data.data?.resetPasswordToken) {
					setToken(newResponse.data.data.resetPasswordToken);
				}
			}

			setStatusMsg(response.data.message);
		} catch (error) {
			console.log("An error occurred while updating the user's password: ", error);
			setStatusMsg('An error occurred while updating your password.');
		} finally {
			setIsLoading(false);

			setTimeout(() => {
				setStatusMsg('');
			}, 5000);
		}
	};

	return (
		<section id="change-password">
			<Reveal width="100%" animation="slide-right" delay={0.05}>
				<h2 className="w-full mb-4 text-2xl font-bellefair text-start">
					Change Password
				</h2>
			</Reveal>

			<Reveal width="100%" animation="slide-bottom" delay={0.05}>
				<p className="text-sm text-gray-500">
					Your password must be at least 8 characters long and contain at least one
					uppercase letter, one lowercase letter, and one number.
				</p>
			</Reveal>

			<Reveal width="100%" animation="slide-bottom" delay={0.05}>
				<form className="my-8 space-y-9" onSubmit={handleSubmit}>
					<Input
						type="password"
						id="newPassword"
						name="newPassword"
						placeholder="New Password"
						value={newPassword}
						onChange={newValue => setNewPassword(newValue)}
						disabled={isLoading}
						required
					/>

					<Input
						type="password"
						id="confirmNewPassword"
						name="confirmNewPassword"
						placeholder="Confirm New Password"
						value={newPasswordConfirm}
						onChange={newValue => setNewPasswordConfirm(newValue)}
						disabled={isLoading}
						required
					/>

					{statusMsg !== '' && (
						<Reveal width="100%" animation="slide-bottom" delay={0.05}>
							<p className="text-sm text-center text-gray-500">{statusMsg}</p>
						</Reveal>
					)}

					<div className="flex justify-center w-full">
						<Button
							type="submit"
							id="change-password-button"
							className="text-white bg-zinc-800 py-1.5 disabled:cursor-not-allowed flex justify-center w-36"
							icon={isLoading ? LoadingIcon : ''}
							iconAlt="Loading Icon"
							iconAnimation="spin"
							disabled={
								isLoading ||
								newPassword.trim() === '' ||
								newPassword !== newPasswordConfirm
							}
						>
							{isLoading ? 'Updating...' : 'Change Password'}
						</Button>
					</div>
				</form>
			</Reveal>
		</section>
	);
};

export default ChangePassword;
