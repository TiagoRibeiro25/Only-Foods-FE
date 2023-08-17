import { useState } from 'react';

interface InputProps {
	placeholder: string;
	type: 'text' | 'password' | 'email' | 'number' | 'tel';
	name: string;
	id: string;
	value: string;
	required: boolean;
	disabled?: boolean;
	autoComplete?: string;
	onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
	placeholder,
	type,
	name,
	id,
	value,
	required,
	disabled,
	autoComplete,
	onChange,
}) => {
	const [inputValue, setInputValue] = useState<string>(value ?? '');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(event.target.value);
		onChange(event.target.value);
	};

	// when value changes, update the input value
	if (value !== inputValue) {
		setInputValue(value);
	}

	return (
		<div className="relative z-0 w-full mb-6 group">
			<input
				type={type}
				name={name}
				id={id}
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-b-gray-900 peer"
				placeholder=" "
				autoComplete={autoComplete ?? 'off'}
				required={required}
				value={inputValue}
				onChange={handleChange}
				disabled={disabled}
			/>
			<label
				htmlFor={id}
				className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
			>
				{placeholder}
			</label>
		</div>
	);
};

export default Input;
