import { Carousel } from 'flowbite-react';
import React from 'react';
import { Base64Img } from '../../../../types/types';
import ConfirmActionModal from '../../../ConfirmActionModal';

interface ImageCarouselProps {
	images: Base64Img[];
	setImages: React.Dispatch<React.SetStateAction<Base64Img[]>>;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
	images,
	setImages,
	showModal,
	setShowModal,
}) => {
	return (
		<>
			<Carousel
				className="w-full h-64 sm:h-96"
				leftControl={images.length > 1 ? '' : ' '}
				rightControl={images.length > 1 ? '' : ' '}
			>
				{images.map((image, index) => (
					<img
						key={image}
						src={image}
						alt={'Recipe Image ' + index}
						className="object-cover w-full h-full hover:cursor-default"
						loading="lazy"
					/>
				))}
			</Carousel>

			<div className="flex justify-center mt-3">
				<button
					type="button"
					className="px-3 py-1 text-sm font-semibold text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700"
					onClick={() => setShowModal(true)}
				>
					Reset Images
				</button>
			</div>

			<ConfirmActionModal
				id="confirm-reset-images"
				message="Are you sure you want to clear all images?"
				onConfirm={() => {
					setShowModal(false);
					setImages([]);
				}}
				onCancel={() => setShowModal(false)}
				show={showModal}
			/>
		</>
	);
};

export default ImageCarousel;
