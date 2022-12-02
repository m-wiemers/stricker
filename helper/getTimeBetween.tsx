type Props = {
  endTime: string;
  startTime: string;
  date: string;
};

const getTimeBetween = ({ endTime, startTime, date }: Props) => {
  const endExt = ` ${endTime}:00`;
  const startExt = ` ${startTime}:00`;

  const endAsDate: any = new Date(date + endExt);
  const startAsDate: any = new Date(date + startExt);

  const diffHours = Math.floor(
    ((endAsDate - startAsDate) % 86400000) / 3600000
  );

  const diffMinutes = Math.floor(
    (((endAsDate - startAsDate) % 86400000) % 3600000) / 60000
  );

  let hDiff = diffHours;
  if (hDiff < 0) {
    hDiff = 24 + hDiff;
  }

  let mDiff = diffMinutes;
  if (mDiff < 0) {
    mDiff = 60 + mDiff;
  }

  switch (mDiff) {
    case 15:
      mDiff = 25;
      break;
    case 30:
      mDiff = 5;
      break;
    case 45:
      mDiff = 75;
      break;
  }

  return `${hDiff},${mDiff}`;
};

export default getTimeBetween;
