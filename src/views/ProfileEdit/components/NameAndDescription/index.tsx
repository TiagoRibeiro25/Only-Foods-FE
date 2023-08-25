import classNames from 'classnames';
import { useContext, useState } from 'react';
import requests from '../../../../api/requests';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Reveal from '../../../../components/Reveal';
import Textarea from '../../../../components/Textarea';
import { UserContext } from '../../../../contextProviders/UserContext';

interface NameAndDescriptionProps {
	username: string;
	description: string;
}

const NameAndDescription: React.FC<NameAndDescriptionProps> = ({
	username,
	description,
}) => {
	const { loggedUser, setLoggedUser } = useContext(UserContext);

	const [newUsername, setNewUsername] = useState<string>(username);
	const [newDescription, setNewDescription] = useState<string>(description);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [statusMsg, setStatusMsg] = useState<string>('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setIsLoading(true);
		setStatusMsg('');

		try {
			// if the username/description is different from the current one, update it
			const response = await requests.users.updateUser({
				username: newUsername !== username ? newUsername : undefined,
				description: newDescription !== description ? newDescription : undefined,
			});

			if (response.data.success && loggedUser) {
				setLoggedUser({
					...loggedUser,
					username: newUsername,
				});
			}

			setStatusMsg(response.data.message);
		} catch (error) {
			console.log(
				"An error occurred while updating the user's name and/or description: ",
				error,
			);
			setStatusMsg('An error occurred while updating your name and/or description.');
		} finally {
			setIsLoading(false);

			setTimeout(() => {
				setStatusMsg('');
			}, 5000);
		}
	};

	return (
		<section id="update-name-and-description">
			<Reveal width="100%" animation="slide-right" delay={0.05}>
				<h2 className="w-full mb-4 text-2xl font-bellefair text-start">
					Update your username and description
				</h2>
			</Reveal>

			<Reveal width="100%" animation="slide-bottom" delay={0.05}>
				<form
					id="update-name-and-description-form"
					className="my-3"
					onSubmit={handleSubmit}
				>
					<Input
						type="text"
						id="username"
						name="username"
						placeholder="Username"
						value={newUsername}
						onChange={newValue => setNewUsername(newValue)}
						disabled={isLoading}
						required
					/>

					<label htmlFor="description" className="text-xs text-gray-500">
						Description
					</label>
					<Textarea
						id="description"
						name="description"
						placeholder="Description (max 150 characters)"
						onChange={newValue => setNewDescription(newValue)}
						disabled={isLoading}
						className="p-3 text-sm border-2 border-gray-500 rounded-md focus:border-gray-500"
					>
						{newDescription}
					</Textarea>

					{statusMsg !== '' && (
						<Reveal width="100%" animation="slide-bottom" delay={0.05}>
							<p className="mt-3 text-sm text-center text-gray-500">{statusMsg}</p>
						</Reveal>
					)}

					<div className="flex flex-row justify-center mt-6 space-x-10 sm:space-x-20">
						<Button
							type="submit"
							id="update-username-and-description-button"
							className={classNames(
								'text-white bg-zinc-800 py-1.5 disabled:cursor-not-allowed flex justify-center',
								isLoading ? 'w-36' : 'w-32',
							)}
							icon={isLoading ? LoadingIcon : ''}
							iconAlt="Loading Icon"
							iconAnimation="spin"
							disabled={
								isLoading ||
								newUsername.trim() === '' ||
								(newUsername === username && newDescription === description)
							}
						>
							{isLoading ? 'Updating...' : 'Apply Changes'}
						</Button>

						<Button
							type="reset"
							id="reset-username-and-description-button"
							className={classNames(
								'text-black bg-white border border-zinc-800 py-1.5 w-32 flex justify-center disabled:cursor-not-allowed',
								isLoading ? 'w-36' : 'w-32',
							)}
							disabled={
								isLoading ||
								newUsername.trim() === '' ||
								(newUsername === username && newDescription === description)
							}
							onClick={() => {
								setNewUsername(username);
								setNewDescription(description);
							}}
						>
							Reset
						</Button>
					</div>
				</form>
			</Reveal>
		</section>
	);
};

export default NameAndDescription;
