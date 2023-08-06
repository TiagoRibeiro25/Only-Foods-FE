export interface User {
	id: number;
	username: string;
	email: string;
	isAdmin: boolean;
	isBlocked: boolean;
	picture?: string;
}

export interface UserContextType {
	loggedUser: User | null;
	setLoggedUser: (user: User | null) => void;
}

export interface UserProviderProps {
	children: React.ReactNode;
}
