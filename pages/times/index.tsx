import { deleteDoc, doc } from 'firebase/firestore';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal';
import { CustomLink } from '../../components/text';
import TimesCard from '../../components/TimesCard';
import { db } from '../../firebase';
import { AuthContext } from '../../firebase/context';
import { getTimes, TimeProps } from '../../helper/firebase/getTimes';
import { updateTimesToFB } from '../../helper/firebase/writeTimes';

export async function getServerSideProps(context: any) {
  const { user } = context.query;

  const currentTimes = await getTimes({ userId: user });

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
  const { user } = useContext(AuthContext);
  const [times, setTimes] = useState<TimeProps[]>(currentTimes);
  const [modal, setModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleDelete = (id: string) => {
    const timesRef = doc(db, 'users', user.uid, 'times', id);
    deleteDoc(timesRef)
      .then(() => {
        setModalMessage('Zeiten gelöscht');
        setModal(true);
      })
      .catch((err) => console.error(err.message));
  };

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
    updateTimesToFB({
      userId: user.uid,
      docId: timesClone[index].id,
      date: timesClone[index].date,
      startTime: timesClone[index].startTime,
      endTime: timesClone[index].endTime,
      duration: timesClone[index].duration,
      submitted: timesClone[index].submitted,
      paid: timesClone[index].paid,
    });
  };

  const handleModalClose = async () => {
    setModal(false);

    const times = await getTimes({ userId: user.uid });

    return setTimes(times);
  };

  const mappedTimes = times.map((time: TimeProps, index) => (
    <TimesCard
      key={time.id}
      id={time.id}
      date={time.date}
      startTime={time.startTime}
      endTime={time.endTime}
      duration={time.duration}
      submitted={time.submitted}
      paid={time.paid}
      onEdit={(id) => router.push(`times/addTimes?id=${id}&user=${user.uid}`)}
      onDelete={(id) => handleDelete(id)}
      onCheckPaid={() => handleChange(index, 'paid')}
      onCheckSubmitted={() => handleChange(index, 'submit')}
    />
  ));

  return (
    <Wrapper>
      <Modal open={modal} onClick={handleModalClose}>
        {modalMessage}
      </Modal>
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
