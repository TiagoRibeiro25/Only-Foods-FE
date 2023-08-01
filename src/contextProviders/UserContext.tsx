import { createContext, useMemo, useState } from 'react';

export interface User {
	id: number;
	username: string;
	email: string;
	isAdmin: boolean;
	picture?: string;
}

interface UserContextType {
	loggedUser: User | null;
	setLoggedUser: (user: User | null) => void;
}

interface UserProviderProps {
	children: React.ReactNode;
}

// Helper function for the placeholder setLoggedUser
const warnSetLoggedUser = (): void => {
	// eslint-disable-next-line no-console
};

// Initialize UserContext with default values for user and setLoggedUser
const UserContext = createContext<UserContextType>({
	loggedUser: null,
	setLoggedUser: warnSetLoggedUser, // Use the warning function as a default placeholder
});

const UserProvider = (props: UserProviderProps) => {
	const [loggedUser, setLoggedUser] = useState<User | null>(null);
	const contextValue = useMemo(
		() => ({ loggedUser, setLoggedUser }),
		[loggedUser, setLoggedUser],
	);

	return (
		<UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
