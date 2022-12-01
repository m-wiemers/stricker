import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import ConcertOverviewCard from '../../components/ConcertOverviewCard';
import { Text } from '../../components/text';
import { db } from '../../firebase';

export async function getServerSideProps() {
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

  concertList.sort((a: any, b: any) =>
    a.date > b.date ? 1 : b.date > a.date ? -1 : 0
  );

  return {
    props: {
      concertList,
    },
  };
}

export type ConcertProps = {
  id: string;
  date: string;
  concertName: string;
  bands: BandProps[];
};

type BandProps = {
  bandName: string;
  startTime: string;
  endTime: string;
  pause?: number;
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 1rem;
`;

const Concerts = ({ concertList }: any): JSX.Element => {
  const concerts: ConcertProps[] = concertList;

  const overview = concerts?.map((concert) => (
    <ConcertOverviewCard
      key={concert.id}
      date={concert.date}
      concertName={concert.concertName}
      startTime={concert.bands[0].startTime}
      endTime={concert.bands[concert.bands.length - 1].endTime}
      bands={concert.bands.map((band) => band.bandName)}
      href={`/concerts/${concert.id}`}
    />
  ));

  return (
    <Wrapper>
      <Text variant="headline">Konzertübersicht</Text>
      {overview}
    </Wrapper>
  );
};

export default Concerts;
