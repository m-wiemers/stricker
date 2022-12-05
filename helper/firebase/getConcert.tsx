import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { BandProps } from './writeConcert';

export type ConcertProps = {
  id: string;
  date: string;
  concertName: string;
  bands: BandProps[];
};

const getConcerts = async (): Promise<ConcertProps[]> => {
  const concertRef = await collection(db, 'concerts');
  const concertList = await getDocs(concertRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      return array;
    })
    .catch((err) => console.log(err));
  return concertList;
};

type GetConcertByIdProps = {
  id: string;
};

const getConcertById = async ({
  id,
}: GetConcertByIdProps): Promise<
  ConcertProps | undefined | void | DocumentData
> => {
  const concertRef = doc(db, 'concerts', id);
  const concert = await getDoc(concertRef)
    .then((concert) => {
      return concert.data();
    })
    .catch((err) => console.error(err.message));

  return concert;
};

export { getConcertById, getConcerts };
