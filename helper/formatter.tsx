export const formatDate = (date: string) => {
  const day = date.slice(8, 10).concat('.');
  const month = date.slice(5, 7).concat('.');
  const year = date.slice(0, 4);
  const final = day + month + year;
  return final;
};
