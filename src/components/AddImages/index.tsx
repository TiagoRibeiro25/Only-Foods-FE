import { useState } from 'react';
import { Base64Img } from '../../types/types';
import DropZone from '../DropZone';
import Reveal from '../Reveal';
import ImageCarousel from './components/ImageCarousel';

interface AddImagesProps {
	images: Base64Img[];
	setImages: React.Dispatch<React.SetStateAction<Base64Img[]>>;
}

const AddImages: React.FC<AddImagesProps> = ({ images, setImages }) => {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<Reveal width="100%" delay={0.05} animation="slide-top">
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
		</Reveal>
	);
};

export default AddImages;
