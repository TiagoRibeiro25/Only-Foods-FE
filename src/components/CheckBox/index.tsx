import { useState } from 'react';

interface CheckBoxProps {
	placeholder: string;
	id: string;
	name: string;
	autoComplete?: string;
	disabled?: boolean;
	onChange: (value: boolean) => void;
}

const CheckBox = ({ ...props }: CheckBoxProps) => {
	const [isChecked, SetIsChecked] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue = event.target.checked;
		SetIsChecked(event.target.checked);
		props.onChange(newValue);
	};

	return (
		<div className="flex items-center">
			<input
				id={props.id}
				name={props.name}
				type="checkbox"
				value=""
				className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-0"
				autoComplete={props.autoComplete ?? 'off'}
				checked={isChecked}
				disabled={props.disabled}
				onChange={handleChange}
			/>
			<label
				htmlFor={props.id}
				className="ml-2 text-sm font-medium text-gray-900 select-none"
			>
				{props.placeholder}
			</label>
		</div>
	);
};

export default CheckBox;
