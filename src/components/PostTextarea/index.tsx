import React, { useEffect, useMemo, useRef, useState } from 'react';
import LoadingIcon from '../../assets/icons/loading.svg';
import Button from '../Button';

interface PostTextAreaProps {
	id: string;
	labelText: string;
	placeholder: string;
	value: string;
	loading: boolean;
	buttonDisabled?: boolean;
	buttonText?: string;
	resizable?: boolean;
	rows?: number;
	cols?: number;
	minLength?: number;
	maxLength?: number;
	onChange: (value: string) => void;
	onSubmit: () => void;
}

const PostTextArea = (props: PostTextAreaProps) => {
	const { value, onChange } = props;
	const [text, setText] = useState<string>(value);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Disable the button if the text is too short or too long
	const isButtonDisabled = useMemo(() => {
		const minLen = props.minLength ?? 1;
		const maxLen = props.maxLength ?? 500;

		if (text.trim().length < minLen) return true;
		if (text.trim().length > maxLen) return true;
		if (props.loading) return true;

		return false;
	}, [props.minLength, props.maxLength, text, props.loading]);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setText(event.target.value);
		onChange(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		return props.onSubmit();
	};

	// Update the textarea height to fit the content
	const updateTextareaHeight = (): void => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'; // Reset height to auto
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	// when props.value changes, update the input value
	if (value !== text) {
		setText(props.value);
	}

	// Update the textarea height whenever the content changes
	useEffect(() => {
		updateTextareaHeight();
	}, [text]);

	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<div className="w-full mb-4 border border-gray-300 rounded-lg bg-gray-50">
				<div className="px-4 py-2 bg-white rounded-t-lg">
					<label htmlFor={props.labelText} className="sr-only">
						{props.labelText}
					</label>
					<textarea
						ref={textareaRef}
						id={props.id}
						className={`w-full px-0 py-1 text-sm text-gray-900 bg-white border-0 outline-none ${
							props.resizable ? 'resize-y' : 'resize-none'
						}`}
						placeholder={props.placeholder}
						maxLength={props.maxLength ?? 500}
						minLength={props.minLength ?? 1}
						value={text}
						onChange={handleChange}
						required
						style={{ minHeight: '7rem', maxHeight: '20rem' }}
					></textarea>
				</div>
				<div className="flex items-center justify-between px-3 py-2 border-t">
					<div className="flex pl-0 space-x-1 sm:pl-2">
						<strong className="text-gray-600">{text.length}</strong>
						<strong className="text-gray-400">/ {props.maxLength ?? 500}</strong>
					</div>
					<Button
						type="submit"
						padding="0.4rem 1.5rem"
						icon={props.loading ? LoadingIcon : ''}
						iconAlt="Loading Icon"
						iconAnimation="spin"
						disabled={isButtonDisabled || props.buttonDisabled}
					>
						{props.buttonText ?? 'Post'}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default PostTextArea;
