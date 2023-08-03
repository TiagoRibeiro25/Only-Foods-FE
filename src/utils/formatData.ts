/**
 * Converts the number of likes into a formatted string representation with units.
 *
 * @param {number} likes - The number of likes to be formatted.
 * @returns {string} The formatted string representation of the likes with units.
 *
 * @example
 * // Example 1
 * const likesCount1 = 1234;
 * const formattedLikes1 = likes(likesCount1);
 * console.log(formattedLikes1); // Output: '1.2k'
 *
 * // Example 2
 * const likesCount2 = 567890;
 * const formattedLikes2 = likes(likesCount2);
 * console.log(formattedLikes2); // Output: '567.9k'
 *
 * // Example 3
 * const likesCount3 = 1200000;
 * const formattedLikes3 = likes(likesCount3);
 * console.log(formattedLikes3); // Output: '1.2M'
 */
const likes = (likes: number): string => {
	if (likes === 0) return '0';

	const units = ['', 'k', 'M'];
	const log1000 = Math.floor(Math.log10(likes) / 3);

	if (log1000 >= units.length) {
		return `${(likes / Math.pow(1000, units.length - 1)).toFixed(0)}${
			units[units.length - 1]
		}`;
	}

	const formattedNum = (likes / Math.pow(1000, log1000)).toFixed(1);
	const decimalPart = parseFloat(formattedNum.split('.')[1]);

	if (decimalPart === 0) {
		return `${formattedNum.split('.')[0]}${units[log1000]}`;
	}

	return `${formattedNum}${units[log1000]}`;
};

/**
 * Converts the number of comments into a formatted string representation with units.
 * This function simply calls the 'likes' function to reuse its formatting logic for comments count.
 *
 * @param {number} comments - The number of comments to be formatted.
 * @returns {string} The formatted string representation of the comments with units.
 *
 * @see {@link likes} - The 'likes' function used to format the comments count.
 *
 * @example
 * // Example 1
 * const commentsCount1 = 1234;
 * const formattedComments1 = comments(commentsCount1);
 * console.log(formattedComments1); // Output: '1.2k'
 *
 * // Example 2
 * const commentsCount2 = 567890;
 * const formattedComments2 = comments(commentsCount2);
 * console.log(formattedComments2); // Output: '567.9k'
 *
 * // Example 3
 * const commentsCount3 = 1200000;
 * const formattedComments3 = comments(commentsCount3);
 * console.log(formattedComments3); // Output: '1.2M'
 */
const comments = (comments: number): string => {
	return likes(comments);
};

export default { likes, comments };
