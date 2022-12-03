import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

type AddTimeProps = {
  userId: string;
  docId?: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  submitted: boolean;
  paid: boolean;
  handleThen?: () => void;
};

const addTimesToFB = ({
  userId,
  date,
  startTime,
  endTime,
  duration,
  submitted,
  paid,
  handleThen,
}: AddTimeProps) => {
  const userCollection = collection(db, 'users', userId, 'times');
  const timesDoc = doc(userCollection);

  setDoc(timesDoc, {
    date,
    startTime,
    endTime,
    duration,
    submitted,
    paid,
  })
    .then(handleThen)
    .catch((err) => console.error(err.message));
};

const updateTimesToFB = ({
  userId,
  docId,
  date,
  startTime,
  endTime,
  duration,
  submitted,
  paid,
  handleThen,
}: AddTimeProps) => {
  const userCollection = collection(db, 'users', userId, 'times');
  const timesDoc = doc(userCollection, docId);

  updateDoc(timesDoc, {
    date,
    startTime,
    endTime,
    duration,
    submitted,
    paid,
  })
    .then(handleThen)
    .catch((err) => console.error(err.message));
};

export { addTimesToFB, updateTimesToFB };
