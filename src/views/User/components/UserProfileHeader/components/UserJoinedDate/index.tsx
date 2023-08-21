interface UserJoinedDateProps {
	joinedAt: string;
}

const UserJoinedDate: React.FC<UserJoinedDateProps> = ({ joinedAt }) => {
	return (
		<>
			Joined on{' '}
			{new Date(joinedAt).toLocaleDateString(navigator.language, {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})}
		</>
	);
};

export default UserJoinedDate;
