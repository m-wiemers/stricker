import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PersonalOverviewCard from '../../../components/PersonalOverviewCard';
import { CustomLink, Text } from '../../../components/text';
import { db } from '../../../firebase';
import { PersonalPlanProps } from '../../../helper/firebase/getPlan';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`;

const ListWrapper = styled.div`
  justify-self: center;
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
  const router = useRouter();

  const handleDelete = (id: string) => {
    const personalPlanRef = doc(db, 'personalPlan', id);
    deleteDoc(personalPlanRef).then(() => {
      router.push('personal');
    });
  };

  const planList = plans.map((plan: PersonalPlanProps, index: number) => (
    <PersonalOverviewCard
      key={index}
      concert={plan.concert}
      isDashboard
      onEdit={() => router.push(`personal/${plan.id}`)}
      onDelete={() => handleDelete(plan.id)}
    />
  ));

  return (
    <Wrapper>
      <CustomLink variant="normal" color="blue" href="personal/addPlan">
        Neuen PersonalPlan anlegen
      </CustomLink>

      <Text marginBottom="1rem" variant="headline">
        Angelegte Pläne bearbeiten:
      </Text>
      <ListWrapper>{planList}</ListWrapper>
    </Wrapper>
  );
};

export default PersonalPlan;
