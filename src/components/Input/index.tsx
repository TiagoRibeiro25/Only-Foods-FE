import { useState } from 'react';

interface InputProps {
	placeholder: string;
	type: 'text' | 'password' | 'email' | 'number' | 'tel';
	name: string;
	id: string;
	required: boolean;
	disabled?: boolean;
	onChange: (value: string) => void;
}

const Input = ({ ...props }: InputProps) => {
	const [value, setValue] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setValue(event.target.value);
		props.onChange(newValue);
	};

	return (
		<div className="relative z-0 w-full mb-6 group">
			<input
				type={props.type}
				name={props.name}
				id={props.id}
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-b-gray-900 peer"
				placeholder=" "
				required={props.required}
				value={value}
				onChange={handleChange}
				disabled={props.disabled}
			/>
			<label
				htmlFor={props.id}
				className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
			>
				{props.placeholder}
			</label>
		</div>
	);
};

export default Input;
