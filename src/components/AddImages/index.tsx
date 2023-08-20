import { useState } from 'react';
import { Base64Img } from '../../types/types';
import DropZone from '../DropZone';
import ImageCarousel from './components/ImageCarousel';

interface AddImagesProps {
	images: Base64Img[];
	setImages: React.Dispatch<React.SetStateAction<Base64Img[]>>;
}

const AddImages: React.FC<AddImagesProps> = ({ images, setImages }) => {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			{images.length > 0 ? (
				<ImageCarousel
					images={images}
					setImages={setImages}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			) : (
				<DropZone images={images} setImages={setImages} />
			)}
		</>
	);
};

export default AddImages;
