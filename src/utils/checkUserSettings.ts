/**
 * Checks if the user has enabled the "Reduce Motion" setting in their operating system or web browser.
 * The "Reduce Motion" setting reduces or disables animations and motion effects across the system and web pages.
 *
 * @function
 * @returns {boolean} Returns true if the "Reduce Motion" setting is active, otherwise false.
 *
 * @example
 * // Example 1: When "Reduce Motion" is enabled
 * const motionReduced = isMotionReduced(); // true
 *
 * // Example 2: When "Reduce Motion" is not enabled
 * const motionReduced = isMotionReduced(); // false
 */
export function isMotionReduced(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
