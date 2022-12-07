import { updateProfile, User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

type UpdateProfileProps = {
  id: string;
  user: User;
  userName: string;
  hourlyWage: string;
  handleThen: () => void;
};

const updateFBProfile = ({
  userName,
  hourlyWage,
  id,
  user,
  handleThen,
}: UpdateProfileProps) => {
  const userRef = doc(db, 'users', id);
  updateDoc(userRef, { userName, hourlyWage })
    .then(() => updateProfile(user, { displayName: userName }))
    .then(handleThen)
    .catch((err) => console.error(err.message));
};

export { updateFBProfile };
