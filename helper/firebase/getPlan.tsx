import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';

export type PersonalPlanProps = {
  concert: string;
  id: string;
  personal: PersonalForPlan[];
};

export type PersonalForPlan = {
  name: string;
  station: string;
  startTime: string;
  endTime: string;
};

const getPlans = async (): Promise<PersonalPlanProps[]> => {
  const personalRef = collection(db, 'personalPlan');
  const personal = await getDocs(personalRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      return array;
    })
    .catch((err) => console.log(err));

  return personal;
};

type GetPlanByIdProps = {
  id: string;
};

const getPlanById = async ({
  id,
}: GetPlanByIdProps): Promise<
  PersonalPlanProps | undefined | void | DocumentData
> => {
  const personalPlanRef = await doc(db, 'personalPlan', id);
  const data = await getDoc(personalPlanRef)
    .then((plan) => {
      return plan.data();
    })
    .catch((err) => console.error(err.message));

  return data;
};

export { getPlans, getPlanById };
