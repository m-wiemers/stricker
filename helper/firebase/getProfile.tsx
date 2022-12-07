import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export type Profile =
  | void
  | DocumentData
  | undefined
  | { id?: string; userName: string; hourlyWage?: number };

type Props = {
  id: string;
};

const getProfileById = async ({ id }: Props): Promise<Profile> => {
  const profileRef = doc(db, 'users', id);
  const profile = await getDoc(profileRef)
    .then((snapshot) => {
      return snapshot.data();
    })
    .catch((err) => console.log(err));
  return profile;
};

export { getProfileById };
