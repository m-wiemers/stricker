import { collection, getDocs, query, where } from 'firebase/firestore';
import { InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import { CustomLink } from '../../components/text';
import TimesCard, { Times } from '../../components/TimesCard';
import { db } from '../../firebase';

export async function getServerSideProps(context: any) {
  const { user } = context.query;

  const timesRef = await collection(db, 'users', user, 'times');
  const times = await getDocs(timesRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      return array;
    })
    .catch((err) => console.log(err));

  times.sort((a: any, b: any) =>
    a.date > b.date ? 1 : b.date > a.date ? -1 : 0
  );

  return {
    props: {
      times,
    },
  };
}

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  max-width: 420px;
  min-width: 420px;
`;

const TimesOverviewPage = ({
  times,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const mappedTimes = times.map((time: Times) => (
    <TimesCard
      key={time.id}
      id={time.id}
      date={time.date}
      startTime={time.startTime}
      endTime={time.endTime}
      duration={time.duration}
      submitted={time.submitted}
      paid={time.paid}
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
