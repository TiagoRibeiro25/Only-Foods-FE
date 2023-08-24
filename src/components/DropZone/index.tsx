import classNames from 'classnames';
import React, { useState } from 'react';
import { Base64Img } from '../../types/types';

interface DropZoneProps {
	images: Base64Img[];
	setImages: React.Dispatch<React.SetStateAction<Base64Img[]>>;
	maxAllowedImages?: number;
	maxImageSize?: number;
}

const VALID_IMAGE_TYPES = [
	'image/png',
	'image/jpg',
	'image/jpeg',
	'image/bmp',
	'image/webp',
];

const DropZone: React.FC<DropZoneProps> = ({
	images,
	setImages,
	maxAllowedImages = 5,
	maxImageSize = 2000000, // 2mb
}) => {
	const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (e.dataTransfer.items) {
			const items = Array.from(e.dataTransfer.items);

			const filesPromises: Promise<File | null>[] = items.map(item => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					return Promise.resolve(file);
				}
				return Promise.resolve(null);
			});

			Promise.all(filesPromises)
				.then(files => {
					const validFiles = files.filter(file => {
						return (
							file && VALID_IMAGE_TYPES.includes(file.type) && file.size <= maxImageSize
						);
					});

					const slicedFiles = validFiles.slice(0, maxAllowedImages - images.length);

					slicedFiles.forEach(file => {
						if (file) {
							readAndAddImage(file);
						}
					});
				})
				.catch(error => {
					console.error('Error processing dropped files:', error);
				});
		}
	};

	const handleImageChange = (files: FileList | null) => {
		if (!files) {
			return;
		}

		const validFiles = Array.from(files).filter(file =>
			VALID_IMAGE_TYPES.includes(file.type),
		);

		const slicedFiles = validFiles.slice(0, 5 - images.length);

		slicedFiles.forEach(file => {
			readAndAddImage(file);
		});
	};

	const readAndAddImage = (file: File) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImages(prevState => [...prevState, reader.result as Base64Img]);
			}
		};

		const blob = new Blob([file], { type: file.type });
		reader.readAsDataURL(blob);
	};

	const handleDragEvent = (
		e: React.DragEvent<HTMLDivElement>,
		type: 'over' | 'leave',
	) => {
		e.preventDefault();
		e.stopPropagation();

		setIsDraggedOver(type === 'over');
	};

	return (
		<div
			className="flex items-center justify-center w-full"
			onDragOver={e => handleDragEvent(e, 'over')}
			onDragLeave={e => handleDragEvent(e, 'leave')}
			onDrop={handleDrop}
		>
			<label
				htmlFor="dropzone-file"
				className={classNames(
					'flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer sm:h-96',
					isDraggedOver ? 'bg-gray-100' : 'bg-gray-50',
				)}
			>
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						className="w-8 h-8 mb-4 textGray-500"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p className="text-sm text-gray-500">
						<span className="font-semibold">Click to upload</span> or drag and drop
					</p>
					<p className="my-2 text-xs text-gray-500">
						{VALID_IMAGE_TYPES.map((type, index) => {
							if (index === VALID_IMAGE_TYPES.length - 1) {
								return type.split('/')[1].toUpperCase();
							}
							return `${type.split('/')[1].toUpperCase()}, `;
						})}
					</p>
					<p className="text-xs text-gray-500">
						Max file size: {maxImageSize / 1000000}MB
					</p>
				</div>
				<input
					id="dropzone-file"
					type="file"
					className="hidden"
					accept="image/png, image/jpg ,image/jpeg, image/bmp, image/webp"
					multiple={maxAllowedImages > 1}
					onChange={e => handleImageChange(e.target.files)}
				/>
			</label>
		</div>
	);
};

export default DropZone;
