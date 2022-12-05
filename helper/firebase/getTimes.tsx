import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';

type Props = {
  userId: string;
};

export type TimeProps = {
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

  currentTimes.sort((a: any, b: any) =>
    a.date > b.date ? 1 : b.date > a.date ? -1 : 0
  );

  return currentTimes;
};

type TimesByIdProps = {
  userId: string;
  id: string;
};

const getTimesById = async ({
  userId,
  id,
}: TimesByIdProps): Promise<
  (TimeProps & string) | undefined | void | DocumentData
> => {
  const timesRef = doc(db, 'users', userId, 'times', id);
  const times = await getDoc(timesRef)
    .then((snapshot) => {
      return snapshot.data();
    })
    .catch((err) => console.log(err));
  return { times, id };
};

export { getTimes, getTimesById };
