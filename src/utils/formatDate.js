import dayjs from 'dayjs';

export const formatDate = (date) => {
  return dayjs(date).format('MM-DD-YYYY');
};