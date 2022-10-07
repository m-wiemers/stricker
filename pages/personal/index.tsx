import { collection, getDocs } from 'firebase/firestore';
import { useContext } from 'react';
import styled from 'styled-components';
import PersonalOverviewCard from '../../components/PersonalOverviewCard';
import { Text } from '../../components/text';
import { db } from '../../firebase';
import { AuthContext } from '../../firebase/context';

export async function getStaticProps() {
  const personalRef = await collection(db, 'personalPlan');
  const personal = await getDocs(personalRef)
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
      personal,
    },
  };
}

export type PersonalPlanProps = {
  concert: string;
  id: string;
  personal: [
    { name: string; station: string; startTime: string; endTime: string }
  ];
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
`;

const Personal = ({ personal }: any): JSX.Element => {
  const { user } = useContext(AuthContext);
  const concerts: PersonalPlanProps[] = personal;

  const mappedConcerts = concerts.map((concert) => {
    return (
      <PersonalOverviewCard
        key={concert.id}
        href={`/personal/${concert.id}`}
        concert={concert.concert}
      />
    );
  });

  return (
    <>
      {user ? (
        <Wrapper>
          <Text variant="headline">Personalplanung</Text>
          {mappedConcerts}
        </Wrapper>
      ) : (
        <Text variant="normal">Du bist nicht angemeldet</Text>
      )}
    </>
  );
};

export default Personal;
