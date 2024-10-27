import moment from "moment";
/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
export const formatDateTime = (date: string): string => moment(date).format("MMMM Do YYYY, h:mm:ss a");

export const formatDate = (date: string): string => moment(date).format("MMMM Do YYYY");
