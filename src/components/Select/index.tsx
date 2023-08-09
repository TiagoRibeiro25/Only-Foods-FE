export interface Option {
	text: string;
	value: string;
}

interface SelectProps {
	id: string;
	labelText: string;
	value: string;
	options: Option[];
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: SelectProps) => {
	return (
		<>
			<label htmlFor={props.id} className="sr-only">
				{props.labelText}
			</label>
			<div className="relative">
				<select
					id={props.id}
					className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
					defaultValue={props.value}
					onChange={props.onChange}
				>
					{props.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					))}
				</select>
				<div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pointer-events-none">
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Select;
