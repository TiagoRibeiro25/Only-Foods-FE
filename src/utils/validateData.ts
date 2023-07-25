/**
 * Check if a password meets the specified requirements.
 *
 * The password must be at least 8 characters long and contain at least one
 * uppercase letter, one lowercase letter, and one number.
 *
 * @param {string} password - The password to be validated.
 * @returns {boolean} Returns true if the password is valid, otherwise false.
 */
export const validatePassword = (password: string): boolean => {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
	return passwordRegex.test(password);
};
