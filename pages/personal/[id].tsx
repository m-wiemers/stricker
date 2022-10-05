import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PersonalPlanProps } from '.';
import { Text } from '../../components/text';
import { db } from '../../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 0.5rem;
`;

const PersonCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 2px solid white;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #212121;
  text-align: center;
`;

const PersonalPlanPage = (): JSX.Element => {
  const router = useRouter();
  const thisId = router.asPath.split('/').pop();
  console.log(thisId);

  const [personalPlan, setPersonalPlan] = useState<PersonalPlanProps>();

  useEffect(() => {
    const readData = async (id: string) => {
      const concertRef = await doc(db, 'personalPlan', id);
      await getDoc(concertRef)
        .then((concert) => {
          const data = concert.data();
          if (data) {
            setPersonalPlan({
              concert: data.concert,
              id: data.id,
              personal: data.personal,
            });
          }
        })
        .catch((err) => console.error(err.message));
    };
    if (thisId) {
      readData(thisId);
    }
  }, [thisId]);

  const personals = personalPlan?.personal.map((person, index) => {
    return (
      <PersonCard key={index}>
        <Text variant="headline" style={{ gridColumn: '1/3' }}>
          {person.name}
        </Text>
        <Text variant="normal" style={{ gridColumn: '1/3' }}>
          {person.station}
        </Text>
        <Text variant="normal">{person.startTime}</Text>
        <Text variant="normal">{person.endTime}</Text>
      </PersonCard>
    );
  });

  return (
    <Wrapper>
      <Text variant="headline">{personalPlan?.concert}</Text>
      {personals}
    </Wrapper>
  );
};

export default PersonalPlanPage;
