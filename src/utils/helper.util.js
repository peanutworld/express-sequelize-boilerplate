/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} - The capitalized string.
 */
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
