import styled from 'styled-components';
import PersonalOverviewCard from '../../components/PersonalOverviewCard';
import { Text } from '../../components/text';
import { getPlans, PersonalPlanProps } from '../../helper/firebase/getPlan';

export async function getServerSideProps() {
  const personal = await getPlans();

  personal.sort((a: any, b: any) => (a > b ? 1 : b > a ? -1 : 0));

  return {
    props: {
      personal,
    },
  };
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
`;

const Personal = ({ personal }: any): JSX.Element => {
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
    <Wrapper>
      <Text variant="headline">Personalplanung</Text>
      {mappedConcerts}
    </Wrapper>
  );
};

export default Personal;
