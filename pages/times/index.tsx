import { collection, getDocs, query, where } from 'firebase/firestore';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { CustomLink } from '../../components/text';
import TimesCard, { Times } from '../../components/TimesCard';
import { db } from '../../firebase';
import { AuthContext } from '../../firebase/context';

export async function getServerSideProps(context: any) {
  const { user } = context.query;

  const timesRef = await collection(db, 'users', user, 'times');
  const currentTimes = await getDocs(timesRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      return array;
    })
    .catch((err) => console.log(err));

  currentTimes.sort((a: any, b: any) =>
    a.date > b.date ? 1 : b.date > a.date ? -1 : 0
  );

  return {
    props: {
      currentTimes,
    },
  };
}

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  min-width: 370px;
  max-width: 370px;
`;

const TimesOverviewPage = ({
  currentTimes,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router = useRouter();
  const [times, setTimes] = useState<Times[]>(currentTimes);

  const handleDelete = (id: string) => {};
  const handleChange = (index: number, target: string) => {
    const timesClone = [...times];
    switch (target) {
      case 'paid':
        if (timesClone[index].paid == true) {
          timesClone[index].paid = false;
        } else {
          timesClone[index].paid = true;
        }
        break;
      case 'submit':
        if (timesClone[index].submitted == true) {
          timesClone[index].submitted = false;
        } else {
          timesClone[index].submitted = true;
        }
        break;
    }
    setTimes(timesClone);
  };

  const mappedTimes = times.map((time: Times, index) => (
    <TimesCard
      key={time.id}
      id={time.id}
      date={time.date}
      startTime={time.startTime}
      endTime={time.endTime}
      duration={time.duration}
      submitted={time.submitted}
      paid={time.paid}
      onEdit={(id) => router.push(`times/${id}`)}
      onDelete={(id) => handleDelete(id)}
      onCheckPaid={() => handleChange(index, 'paid')}
      onCheckSubmitted={() => handleChange(index, 'submit')}
    />
  ));

  return (
    <Wrapper>
      <InnerWrapper>
        <CustomLink variant="normal" href="/times/addTimes" color="blue">
          Neue Zeiten eintragen
        </CustomLink>
        {mappedTimes}
      </InnerWrapper>
    </Wrapper>
  );
};

export default TimesOverviewPage;
