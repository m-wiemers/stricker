import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import { Text } from '../../components/text';
import { getPlanById, PersonalPlanProps } from '../../helper/firebase/getPlan';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getId = (): string => {
    const { id } = context.query;
    if (typeof id == 'string') {
      return id;
    } else {
      return 'no data';
    }
  };

  const data = await getPlanById({ id: getId() });

  return {
    props: {
      data,
    },
  };
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
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
  width: 300px;
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  grid-column: 1/3;
  background-color: white;
  margin-bottom: 0.5rem;
`;

const PersonalPlanPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const personalPlan: PersonalPlanProps = data;

  const personals = personalPlan.personal.map((person, index) => {
    return (
      <PersonCard key={index}>
        <Text variant="normal" style={{ gridColumn: '1/3' }}>
          {person.name}
        </Text>
        <Text
          variant="normal"
          style={{ gridColumn: '1/3', fontWeight: 'bold' }}
        >
          {person.station}
        </Text>
        <Line />
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
