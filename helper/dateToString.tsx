type DateToStrinProps = {
  date?: Date;
  today?: boolean;
};

const DateToString = ({ date, today }: DateToStrinProps): string => {
  if (date !== undefined) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  if (today !== undefined) {
    const today = new Date().toISOString().slice(0, 10);
    return today;
  }

  return '';
};

export { DateToString };
