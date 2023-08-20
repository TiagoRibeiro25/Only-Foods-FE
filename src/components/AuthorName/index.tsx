import React from 'react';

interface AuthorNameProps {
	authorName: string;
	isBlocked: boolean;
}

const AuthorName: React.FC<AuthorNameProps> = ({ authorName, isBlocked }) => {
	return (
		<>
			{isBlocked ? (
				<span className="text-sm text-gray-700">(User Blocked)</span>
			) : (
				authorName
			)}{' '}
		</>
	);
};

export default AuthorName;
