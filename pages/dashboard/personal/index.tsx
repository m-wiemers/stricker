import { collection, getDocs } from 'firebase/firestore';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import EditIcon from '../../../components/icons/editIcon';
import { CustomLink, Text } from '../../../components/text';
import { db } from '../../../firebase';

type PlanProps = {
  concert: string;
  id: string;
  personal: {
    name: string;
    station: string;
    startTime: string;
    endTime: string;
  }[];
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`;

const LinkWrapper = styled.div`
  margin-bottom: 1rem;
  justify-self: center;
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid white;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const planRef = await collection(db, 'personalPlan');
  const plans = await getDocs(planRef)
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
      plans,
    },
  };
};

const PersonalPlan = ({
  plans,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const planList = plans.map((concert: PlanProps, index: number) => (
    <LinkWrapper key={index}>
      <CustomLink
        href={`personal/${concert.id}`}
        variant="normal"
        colorOnHover="green"
      >
        {concert.concert}
      </CustomLink>
    </LinkWrapper>
  ));

  return (
    <Wrapper>
      <CustomLink variant="normal" color="blue" href="personal/addPlan">
        Neuen PersonalPlan anlegen
      </CustomLink>

      <Text marginBottom="1rem" variant="headline">
        Angelegte Pläne bearbeiten:
      </Text>
      {planList}
    </Wrapper>
  );
};

export default PersonalPlan;
