

module.exports = {
	/**
	 * Returns a random whole number.
	 * @param {number} min - minimum
	 * @param {number} max - maximum
	 * @returns {number} - random number
	 * @constructor
	 */
	randomInt(min, max)
	{
		return Math.floor(Math.random() * Math.floor(max - min) + min);
	}
};
