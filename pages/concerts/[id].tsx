import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import { ConcertProps } from '.';
import { Text } from '../../components/text';
import { db } from '../../firebase';
import { formatDate } from '../../helper/formatter';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getId = (): string => {
    const { id } = context.query;
    if (typeof id == 'string') {
      return id;
    } else {
      return 'no data';
    }
  };

  const concertRef = await doc(db, 'concerts', getId());
  const concertDetails = await getDoc(concertRef)
    .then((concert) => {
      const data = concert.data();

      return data;
    })
    .catch((err) => console.error(err.message));

  return {
    props: {
      concertDetails,
    },
  };
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  text-align: center;
`;

const BandWrapper = styled.div`
  display: grid;
  grid-column: 1/3;
  grid-template-columns: 1fr 1fr;
  min-width: 15rem;
  border: 2px solid white;
  border-radius: 10px;
  box-shadow: 2px 2px 4px white;
  width: 300px;
  margin-bottom: 1rem;
`;

const PauseSection = styled.div`
  display: grid;
  grid-column: 1/3;
  margin-bottom: 1rem;
  background-color: #252525;
  border-radius: 10px;
  width: 300px;
`;

const ConcertPage = ({
  concertDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const concert: ConcertProps = concertDetails;

  const formattedDate = concert && formatDate(concert?.date);

  const bandSection = concert.bands.map((band, index) => {
    return (
      <div key={index}>
        <BandWrapper>
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
      </div>
    );
  });

  return (
    <Wrapper>
      <Text variant="headline">
        {`${formattedDate} - ${concert?.concertName}`}
      </Text>
      <>{bandSection}</>
    </Wrapper>
  );
};

export default ConcertPage;
