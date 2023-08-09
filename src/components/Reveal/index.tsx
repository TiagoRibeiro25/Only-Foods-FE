import { AnimationControls, motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { isMotionReduced } from '../../utils/checkUserSettings';
import ANIMATIONS from './animations';

interface RevealProps {
	children?: React.ReactNode;
	width?: 'fit-content' | '100%';
	animation?: 'fade' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right';
	duration?: number;
	delay?: number;
}

const Reveal = ({
	children,
	width = 'fit-content',
	animation = 'fade',
	duration = 0.5,
	delay = 0.3,
}: RevealProps) => {
	const disableMotion: boolean = isMotionReduced();

	const ref: React.MutableRefObject<null> = useRef(null);
	const isInView: boolean = useInView(ref, { once: true });
	const mainControls: AnimationControls = useAnimation();

	const variants = ANIMATIONS[animation];
	const transition = { duration, delay };

	useEffect(() => {
		if (isInView) {
			mainControls.start('visible');
		}
	}, [isInView, mainControls]);

	return (
		<div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
			{disableMotion ? (
				<div>{children}</div>
			) : (
				<motion.div
					variants={variants}
					initial="hidden"
					animate={mainControls}
					transition={transition}
				>
					{children}
				</motion.div>
			)}
		</div>
	);
};

export default Reveal;
