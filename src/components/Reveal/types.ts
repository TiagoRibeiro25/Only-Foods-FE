type Animation = 'fade' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right';

export interface RevealProps {
	children?: React.ReactNode;
	width?: 'fit-content' | '100%';
	animation?: Animation;
	duration?: number;
	delay?: number;
}
