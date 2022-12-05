import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { PersonalForPlan, PersonalPlanProps } from './getPlan';

type Props = {
  concert: string;
  personal: PersonalForPlan[];
  handleThen?: () => void;
};

const addPersonalPlanToFB = ({ concert, personal, handleThen }: Props) => {
  const personalPlanRef = collection(db, 'personalPlan');
  addDoc(personalPlanRef, { concert, personal })
    .then(handleThen)
    .catch((err) => console.error(err.message));
};

type UpdatePersonalPlanProps = {
  id: string;
  newConcert: PersonalPlanProps;
  handleThen?: () => void;
};

const updatePersonalPlanToFB = ({
  id,
  newConcert,
  handleThen,
}: UpdatePersonalPlanProps) => {
  const planRef = doc(db, 'personalPlan', id);
  updateDoc(planRef, newConcert)
    .then(handleThen)
    .catch((err) => console.error(err.message));
};

export { addPersonalPlanToFB, updatePersonalPlanToFB };
