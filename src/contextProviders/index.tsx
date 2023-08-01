import { ThoughtsProvider } from './ThoughtsContext.tsx';
import { UserProvider } from './UserContext.tsx';

interface ProvidersProps {
	children: React.ReactNode;
}

const Providers = (props: ProvidersProps) => {
	return (
		<>
			<UserProvider>
				<ThoughtsProvider>{props.children}</ThoughtsProvider>
			</UserProvider>
		</>
	);
};

export default Providers;
