import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

type Props = {
  userId: string;
};

type TimeProps = {
  id: string;
  date: string;
  startTime: `${string}:${string}`;
  endTime: `${string}:${string}`;
  duration: string;
  submitted: boolean;
  paid: boolean;
};

const getTimes = async ({ userId }: Props): Promise<TimeProps[]> => {
  const timesRef = collection(db, 'users', userId, 'times');

  const currentTimes = await getDocs(timesRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      return array;
    })
    .catch((err) => console.log(err));
  return currentTimes;
};

type TimesByIdProps = {
  userId: string;
  id: string;
};

const getTimesById = async ({
  userId,
  id,
}: TimesByIdProps): Promise<TimeProps[]> => {
  const timesRef = collection(db, 'users', userId, 'times');
  const q = query(timesRef, where('__name__', '==', id));
  const currentTimes = await getDocs(q)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      return array;
    })
    .catch((err) => console.log(err));
  return currentTimes;
};

export { getTimes, getTimesById };
