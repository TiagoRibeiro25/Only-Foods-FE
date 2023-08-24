import Input from '../../../../components/Input';

interface AccountInfoProps {
	id: number;
	email: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ id, email }) => {
	return (
		<section
			id="account-info"
			className="flex flex-col mt-4 mb-12 space-y-6 sm:space-x-20 sm:flex-row sm:space-y-0 sm:mb-4"
		>
			<Input
				type="number"
				id="user-local-id"
				name="user-local-id"
				value={id.toString()}
				disabled
				placeholder="Internal User ID"
			/>

			<Input
				type="email"
				id="user-email"
				name="user-email"
				value={email}
				disabled
				placeholder="Email Address"
			/>
		</section>
	);
};

export default AccountInfo;
