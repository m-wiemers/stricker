import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ConcertProps } from '.';
import { Text } from '../../components/text';
import { db } from '../../firebase';
import { formatDate } from '../../helper/formatter';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
`;

const BandWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-width: 15rem;
  border: 2px solid white;
  border-radius: 10px;
  box-shadow: 2px 2px 4px white;
  width: 100%;
  margin-bottom: 1rem;
`;

const PauseSection = styled.div`
  display: grid;
  grid-column: 1/3;
  margin-bottom: 1rem;
  background-color: #252525;
  border-radius: 10px;
`;

const ConcertPage = (): JSX.Element => {
  const router = useRouter();
  const thisId = router.asPath.split('/').pop();
  const [concert, setConcert] = useState<ConcertProps>();

  useEffect(() => {
    const readData = async (id: string) => {
      const concertRef = await doc(db, 'concerts', id);
      await getDoc(concertRef)
        .then((concert) => {
          const data = concert.data();
          if (data) {
            setConcert({
              id: data.id,
              date: data.date,
              bands: data.bands,
              concertName: data.concertName,
            });
          }
        })
        .catch((err) => console.error(err.message));
    };
    if (thisId) {
      readData(thisId);
    }
  }, [thisId]);

  const formattedDate = concert && formatDate(concert?.date);

  const bandSection = concert?.bands.map((band, index) => {
    return (
      <>
        <BandWrapper key={index}>
          <Text variant="normal" style={{ gridColumn: '1/3' }}>
            {band.bandName}
          </Text>
          <Text variant="label">Beginn</Text>
          <Text variant="label">Ende</Text>
          <Text variant="normal">{band.startTime}</Text>
          <Text variant="normal">{band.endTime}</Text>
        </BandWrapper>
        {band.pause !== 0 && band.pause !== undefined && (
          <PauseSection>
            <Text variant="normal" color="blue">
              Umbaupause: {band.pause} Minuten
            </Text>
          </PauseSection>
        )}
      </>
    );
  });

  return (
    <Wrapper>
      <Text variant="headline" style={{ gridColumn: '1/3' }}>
        {formattedDate}
      </Text>
      <>{bandSection}</>
    </Wrapper>
  );
};

export default ConcertPage;
