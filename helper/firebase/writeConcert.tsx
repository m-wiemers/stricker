import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

type Props = {
  date: string;
  concertName: string;
  bands: BandProps[];
  handleThen: () => void;
};

type BandProps = {
  bandName: string;
  startTime?: string;
  endTime?: string;
  pause?: number;
};

const addConcertToFB = ({ date, concertName, bands, handleThen }: Props) => {
  const concertRef = collection(db, 'concerts');
  addDoc(concertRef, { date: date, concertName: concertName, bands: bands })
    .then(handleThen)
    .catch((err) => console.error(err.message));
};

type UpdateConcertProps = {
  id: string;
  date: string;
  concertName: string;
  bands: BandProps[];
  handleThen?: () => void;
};

const updateConcertToFB = ({
  id,
  date,
  concertName,
  bands,
  handleThen,
}: UpdateConcertProps) => {
  const concertRef = doc(db, 'concerts', id);
  updateDoc(concertRef, { date, concertName, bands })
    .then(handleThen)
    .catch((err) => console.error(err.message));
};

export { addConcertToFB, updateConcertToFB };
