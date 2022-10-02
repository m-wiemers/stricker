import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const readData = async () => {
  const workRef = await collection(db, 'workers');
  await getDocs(workRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      return array;
    })
    .catch((err) => console.log(err));
};

export { readData };
