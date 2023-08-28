import React from 'react';
import { Link } from 'react-router-dom';
import UserNoPicture from '../../../../assets/imgs/user.webp';
import { IUser } from '../../../../types/types';

interface UserResultProps {
	user: IUser;
}

const UserResult: React.FC<UserResultProps> = ({ user }) => {
	return (
		<div className="flex flex-row w-full">
			<div className="flex-shrink-0 w-[65px] h-[65px]">
				<Link
					to={'/user/' + user.id}
					className="transition-opacity duration-300 hover:opacity-80"
				>
					<img
						className="object-cover object-center w-16 h-16 rounded-full"
						src={user.userImage?.cloudinaryImage ?? UserNoPicture}
						alt="user"
						loading="lazy"
					/>
				</Link>
			</div>

			<div className="flex flex-col w-full pl-3">
				<div className="flex flex-col sm:flex-row sm:h-1/2">
					<h2 className="text-2xl truncate font-bellefair">
						<Link to={'/user/' + user.id} className="hover:underline">
							{user.username}
						</Link>
					</h2>

					<div className="flex items-center flex-grow cursor-default sm:justify-end">
						<span className="mr-3 text-sm text-gray-600">
							<span className="flex-font-bellefair">{user.followers}</span>{' '}
							{user.followers === 1 ? 'follower' : 'followers'}
						</span>
						<span className="text-sm text-gray-600">
							<span className="flex-font-bellefair">{user.following}</span> following{' '}
						</span>
					</div>
				</div>

				<div className="flex-row hidden sm:flex h-1/2">
					<p className="w-full text-sm text-gray-500 truncate">
						{user.description.trim().length > 0
							? user.description.trim()
							: 'No description provided'}
					</p>

					<p className="flex justify-end flex-grow w-full text-sm text-gray-500">
						Joined on{' '}
						{new Date(user.createdAt).toLocaleDateString(navigator.language, {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserResult;
