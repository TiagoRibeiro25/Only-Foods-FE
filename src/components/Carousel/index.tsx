import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface CarouselProps {
	images: {
		id: number;
		src: string;
	}[];
}

//TODO: Fix this component
const Carousel: React.FC<CarouselProps> = ({ images }: CarouselProps) => {
	const [currentSlide, setCurrentSlide] = useState<number>(0);

	console.log(images[0]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide(prevState => {
				if (prevState === images.length - 1) {
					return 0;
				} else {
					return prevState + 1;
				}
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<div id="default-carousel">
			<div className="flex items-center justify-center h-56 overflow-hidden border rounded-lg md:h-72">
				<LazyLoadImage
					src={images[currentSlide].src}
					alt="Carousel Image"
					className="inset-0 object-cover w-full h-full"
					effect="blur"
				/>
			</div>
		</div>
	);
};

export default Carousel;
