import dayjs from 'dayjs';

export const formatDate = (date: Date) => {
	const day = dayjs(date);
	return day.format('DD MMMM YYYY');
};
