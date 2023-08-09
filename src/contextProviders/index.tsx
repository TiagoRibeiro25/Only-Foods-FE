import { RecipesProvider } from './RecipesContext.tsx';
import { ThoughtsProvider } from './ThoughtsContext.tsx';
import { UserProvider } from './UserContext.tsx';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<UserProvider>
				<ThoughtsProvider>
					<RecipesProvider>{children}</RecipesProvider>
				</ThoughtsProvider>
			</UserProvider>
		</>
	);
};

export default Providers;
