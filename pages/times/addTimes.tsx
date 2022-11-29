import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import TimeInput from '../../components/TimeInput';
import { db } from '../../firebase';
import { AuthContext } from '../../firebase/context';
import { DateToString } from '../../helper/dateToString';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  max-width: 420px;
  min-width: 420px;
  border: 2px solid white;
  border-radius: 10px;
  display: grid;
  justify-content: center;
  padding: 0.5rem;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

const getMinutesBetween = (end: number, start: number) => {
  let mEnd = 0;
  switch (end) {
    case 15:
      mEnd = 0.25;
      break;
    case 30:
      mEnd = 0.5;
      break;
    case 45:
      mEnd = 0.75;
      break;
  }

  let mStart = 0;
  switch (start) {
    case 15:
      mStart = 0.25;
      break;
    case 30:
      mStart = 0.5;
      break;
    case 45:
      mStart = 0.75;
      break;
  }

  const diff = mEnd + mStart;
  return diff;
};

const AddTimePage = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const today = DateToString({ today: true });
  const [name, setName] = useState<string>(user.displayName || '');
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<`${string}:${string}`>('18:00');
  const [endTime, setEndTime] = useState<`${string}:${string}`>('23:45');
  const [duration, setDuration] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    const endExt = ` ${endTime}:00`;
    const startExt = ` ${startTime}:00`;

    const endHour = new Date(date + endExt).getHours();
    const startHour = new Date(date + startExt).getHours();
    let hDiff = endHour - startHour;
    if (hDiff < 0) {
      hDiff = 24 + hDiff;
    }

    const endMin = new Date(date + endExt).getMinutes();
    const startMin = new Date(date + startExt).getMinutes();

    console.log(getMinutesBetween(endMin, startMin) + hDiff);
  }, [startTime, endTime, date]);

  const handleChange = (value: string, target: string, time: string) => {
    if (target === 'hour') {
      if (time == 'start') {
        setStartTime(`${value}:${startTime.split(':').pop()}`);
      }
      if (time == 'end') {
        setEndTime(`${value}:${endTime.split(':').pop()}`);
      }
    }

    if (target === 'minute') {
      if (time === 'start') {
        setStartTime(`${startTime.slice(0, 2)}:${value}`);
      }
      if (time === 'end') {
        setEndTime(`${endTime.slice(0, 2)}:${value}`);
      }
    }
  };

  const handleSubmit = () => {
    const userRef = doc(db, 'users', user.uid);
    updateDoc(userRef, { [date]: [startTime, endTime] })
      .then(() => setModal(true))
      .catch((err) => console.error(err.message));
  };

  return (
    <Wrapper>
      <Modal open={modal} onClick={() => setModal(false)}>
        Zeiten gespeichert
      </Modal>
      <InnerWrapper>
        <Input
          type="text"
          label="Name"
          placeholder="Arnold"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TimeInputWrapper>
          <TimeInput
            label="Start"
            value={startTime}
            handleChange={(val, target) => handleChange(val, target, 'start')}
          />
          <TimeInput
            label="Ende"
            value={endTime}
            handleChange={(val, target) => handleChange(val, target, 'end')}
          />
        </TimeInputWrapper>
        <Button label="Speichern" onClick={handleSubmit} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default AddTimePage;
