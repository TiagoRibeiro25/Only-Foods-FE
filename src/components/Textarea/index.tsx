import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

interface TextareaProps {
	placeholder: string;
	className?: string;
	name: string;
	id?: string;
	required?: boolean;
	disabled?: boolean;
	autoComplete?: string;
	minLength?: number;
	maxLength?: number;
	resizable?: boolean;
	children?: React.ReactNode;
	onChange: (value: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({
	placeholder,
	className,
	name,
	id,
	required,
	disabled,
	autoComplete,
	minLength,
	maxLength,
	resizable,
	children,
	onChange,
}) => {
	const [text, setText] = useState<string>(children as string);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setText(event.target.value);
		onChange(event.target.value);
	};

	// Update the textarea height to fit the content
	const updateTextareaHeight = (): void => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'; // Reset height to auto
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	// when value changes, update the input value
	if (children !== text) {
		setText(children as string);
	}

	// Update the textarea height whenever the content changes
	useEffect(() => {
		updateTextareaHeight();
	}, [text]);

	return (
		<textarea
			{...(id ? { id } : {})}
			ref={textareaRef}
			name={name}
			className={classNames(
				'w-full text-gray-900 bg-white outline-none focus:ring-0',
				className,
				resizable ? 'resize-y' : 'resize-none',
			)}
			placeholder={placeholder ?? 'Enter text here...'}
			autoComplete={autoComplete ?? 'off'}
			value={text}
			maxLength={maxLength ?? 500}
			minLength={minLength ?? 1}
			required={required ?? false}
			disabled={disabled}
			onChange={handleChange}
			style={{ minHeight: '7rem', maxHeight: '40rem' }}
		></textarea>
	);
};

export default Textarea;
