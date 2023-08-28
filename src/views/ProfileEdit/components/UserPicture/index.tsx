import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import requests from '../../../../api/requests';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import UserNoPicture from '../../../../assets/imgs/user.webp';
import Button from '../../../../components/Button';
import DropZone from '../../../../components/DropZone';
import Reveal from '../../../../components/Reveal';
import { UserContext } from '../../../../contextProviders/UserContext';
import { Base64Img } from '../../../../types/types';

interface UserPictureProps {
	userImage: string;
}

const UserPicture: React.FC<UserPictureProps> = ({ userImage }) => {
	const { loggedUser, setLoggedUser } = useContext(UserContext);

	const [updatedImage, setUpdatedImage] = useState<Base64Img[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [buttonText, setButtonText] = useState<string>('Update Image');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await requests.users.updateUser({
				picture: updatedImage[0],
			});

			if (response.data.success && loggedUser) {
				setLoggedUser({
					...loggedUser,
					picture: updatedImage[0],
				});
			}

			setButtonText(response.data.success ? 'Success' : 'Error');
		} catch (error) {
			console.log("An error occurred while updating the user's profile picture: ", error);
			setButtonText('Error');
		} finally {
			setIsLoading(false);

			setTimeout(() => {
				setButtonText('Update Image');
			}, 3000);
		}
	};

	useEffect(() => {
		// Every time an image is added to the array, only keep the last one
		if (updatedImage.length > 1) {
			setUpdatedImage([updatedImage[updatedImage.length - 1]]);
		}
	}, [updatedImage]);

	return (
		<section id="update-user-picture">
			<form
				className="flex flex-col w-full md:space-x-20 md:flex-row"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col items-center mb-8 md:w-1/2 md:mb-0">
					<Reveal width="100%" animation="slide-right" delay={0.05}>
						<h2 className="w-full mb-4 text-2xl font-bellefair text-start">
							Update your profile picture
						</h2>
					</Reveal>
					<Reveal width="100%" animation="slide-left" delay={0.05}>
						<div className="flex justify-center">
							<LazyLoadImage
								className="object-cover object-center my-4 rounded-full w-60 h-60"
								src={updatedImage.length > 0 ? updatedImage[0] : userImage}
								placeholderSrc={UserNoPicture}
								effect="blur"
								alt="User Profile Picture"
							/>
						</div>
					</Reveal>

					<Reveal width="100%" animation="slide-bottom">
						<div className="flex flex-row justify-center mt-6 space-x-10">
							<Button
								type="submit"
								id="update-user-picture-button"
								className={classNames(
									'text-white bg-zinc-800 py-1.5 disabled:cursor-not-allowed flex justify-center',
									isLoading ? 'w-36' : 'w-32',
								)}
								icon={isLoading ? LoadingIcon : ''}
								iconAlt="Loading Icon"
								iconAnimation="spin"
								disabled={
									updatedImage.length === 0 || isLoading || buttonText !== 'Update Image'
								}
							>
								{isLoading ? 'Updating...' : buttonText}
							</Button>

							<Button
								type="reset"
								id="reset-user-picture-button"
								className={classNames(
									'text-black bg-white border border-zinc-800 py-1.5 w-32 flex justify-center disabled:cursor-not-allowed',
									isLoading ? 'w-36' : 'w-32',
								)}
								disabled={updatedImage.length === 0 || isLoading}
								onClick={() => setUpdatedImage([])}
							>
								Reset
							</Button>
						</div>
					</Reveal>
				</div>

				<div className="flex items-center justify-center md:w-1/2">
					<Reveal width="100%" animation="slide-right" delay={0.05}>
						<DropZone
							images={updatedImage}
							setImages={setUpdatedImage}
							maxAllowedImages={1}
						/>
					</Reveal>
				</div>
			</form>
		</section>
	);
};

export default UserPicture;
