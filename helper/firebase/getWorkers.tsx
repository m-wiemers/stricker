import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export type Worker = {
  id: string;
  name: string;
  station: string;
};

type Props = { unshift?: true | undefined };

const getWorkers = async ({ unshift }: Props): Promise<Worker[]> => {
  const workRef = collection(db, 'workers');
  const initialWorkers = await getDocs(workRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      unshift && array.unshift({ name: 'Keine Angabe' });
      return array;
    })
    .catch((err) => console.log(err));

  return initialWorkers;
};

export { getWorkers };
