import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import ConcertOverviewCard from '../../../components/ConcertOverviewCard';
import Modal from '../../../components/modal';
import { Text } from '../../../components/text';
import { db } from '../../../firebase';
import { ConcertProps } from '../../concerts';

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

  return {
    props: {
      concertList,
    },
  };
}

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
`;

const Concerts = ({ concertList }: any): JSX.Element => {
  const concerts: ConcertProps[] = concertList;
  const [modal, setModal] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = (id: string) => {
    const concertRef = doc(db, 'concerts', id);
    deleteDoc(concertRef).then(() => {
      setModal(true);
    });
  };

  const handleModalClose = () => {
    setModal(false);
    router.push('concerts');
  };

  const concertsCards = concerts.map((concert, index) => {
    return (
      <ConcertOverviewCard
        key={index}
        date={concert.date}
        concertName={concert.concertName}
        bands={concert.bands.map((band) => band.bandName)}
        startTime={concert.bands[0].startTime}
        endTime={concert.bands[concert.bands.length - 1].endTime}
        onDelete={() => handleDelete(concert.id)}
        onEdit={() => router.push(`concerts/${concert.id}`)}
      />
    );
  });

  return (
    <Wrapper>
      <Modal open={modal} onClick={handleModalClose}>
        Konzert wurde gelöscht.
      </Modal>
      <Text marginBottom="1rem" variant="headline">
        Angelegte Konzerte
      </Text>
      {concertsCards}
    </Wrapper>
  );
};

export default Concerts;
