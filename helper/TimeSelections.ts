export const Hours: string[] = [
  '00',
  '01',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];

export const Minutes: string[] = ['00', '15', '30', '45'];

export const Months: { value: string; monthNumber: string; index: number }[] = [
  { value: 'Januar', monthNumber: '01', index: 0 },
  { value: 'Februrar', monthNumber: '02', index: 1 },
  { value: 'März', monthNumber: '03', index: 2 },
  { value: 'April', monthNumber: '04', index: 3 },
  { value: 'Mai', monthNumber: '05', index: 4 },
  { value: 'Juni', monthNumber: '06', index: 5 },
  { value: 'Juli', monthNumber: '07', index: 6 },
  { value: 'August', monthNumber: '08', index: 7 },
  { value: 'September', monthNumber: '09', index: 8 },
  { value: 'Oktober', monthNumber: '10', index: 9 },
  { value: 'November', monthNumber: '11', index: 10 },
  { value: 'Dezember', monthNumber: '12', index: 11 },
];

export const getMonthAsSting = (value: string): string => {
  const monthString = Months.find((date) => date.monthNumber == value);

  if (monthString) {
    return monthString.value;
  } else {
    return '';
  }
};
