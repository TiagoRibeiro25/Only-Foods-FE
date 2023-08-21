import classNames from 'classnames';

interface ProfileUsernameProps {
	username: string;
	isBlocked: boolean;
	isAdmin: boolean;
}

const ProfileUsername: React.FC<ProfileUsernameProps> = ({
	username,
	isBlocked,
	isAdmin,
}) => {
	return (
		<>
			<h1 className="text-2xl sm:mr-1">
				{isBlocked ? <s className="text-gray-600">{username}</s> : username}
			</h1>
			{(isAdmin || isBlocked) && (
				<span
					className={classNames(
						'sm:px-2 sm:py-0.5 px-3 py-1 sm:text-xs text-sm rounded sm:mb-0 mb-4',
						{
							'text-white bg-gray-700 animate-pulse sm:mt-0 mt-2': isAdmin,
							'text-gray-700 border-gray-700 border-2 sm:mt-1': isBlocked,
						},
					)}
				>
					{isAdmin ? 'Admin' : 'Blocked'}
				</span>
			)}
		</>
	);
};

export default ProfileUsername;
