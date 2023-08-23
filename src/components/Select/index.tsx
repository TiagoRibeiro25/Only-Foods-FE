import classNames from 'classnames';

export interface Option {
	text: string;
	value: string;
	default: boolean;
}

interface SelectProps {
	id?: string;
	labelText: string;
	value: string;
	options: Option[];
	className?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
	id,
	labelText,
	value,
	options,
	className,
	onChange,
}) => {
	return (
		<>
			<label htmlFor={id} className="sr-only">
				{labelText}
			</label>
			<div className={classNames('relative', className)}>
				<select
					{...(id ? { id: id } : {})}
					className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
					defaultValue={value}
					onChange={onChange}
				>
					{options.map(option => (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					))}
				</select>
			</div>
		</>
	);
};

export default Select;
