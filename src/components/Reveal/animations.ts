const ANIMATIONS = {
	fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
	'slide-top': { hidden: { opacity: 0, y: -100 }, visible: { opacity: 1, y: 0 } },
	'slide-bottom': { hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } },
	'slide-left': { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
	'slide-right': { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
};

export default ANIMATIONS;
