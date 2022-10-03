import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConcertOverviewCard from '../../components/ConcertOverviewCard';
import { Text } from '../../components/text';
import { db } from '../../firebase';

export type ConcertProps = {
  id: string;
  date: string;
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
  gap: 1rem;
`;

const Concerts = (): JSX.Element => {
  const [concerts, setConcerts] = useState<ConcertProps[]>();

  useEffect(() => {
    const readData = async () => {
      const workRef = await collection(db, 'concerts');
      await getDocs(workRef)
        .then((snapshot) => {
          const array: any = [];
          snapshot.docs.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
          });
          setConcerts(array);
          return array;
        })
        .catch((err) => console.log(err));
    };
    readData();
  }, []);

  const overview = concerts?.map((concert) => (
    <ConcertOverviewCard
      key={concert.id}
      date={concert.date}
      startTime={concert.bands[0].startTime}
      endTime={concert.bands[concert.bands.length - 1].endTime}
      bands={concert.bands.map((band) => band.bandName)}
      href={`/concerts/${concert.id}`}
    />
  ));

  return (
    <Wrapper>
      <Text variant="headline" style={{ gridColumn: '1/3' }}>
        Konzertübersicht
      </Text>
      {overview}
    </Wrapper>
  );
};

export default Concerts;
