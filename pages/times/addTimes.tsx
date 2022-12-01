import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import { Text } from '../../components/text';
import TimeInput from '../../components/TimeInput';
import { db } from '../../firebase';
import { AuthContext } from '../../firebase/context';
import { DateToString } from '../../helper/dateToString';
import getTimeBetween from '../../helper/getTimeBetween';

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
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
`;

const AddTimePage = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const today = DateToString({ today: true });
  const [name, setName] = useState<string>(user.displayName || '');
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<`${string}:${string}`>('18:00');
  const [endTime, setEndTime] = useState<`${string}:${string}`>('23:45');
  const [duration, setDuration] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [mustSubmitted, setMustSubmitted] = useState<boolean>(false);
  const [paid, setPaid] = useState<boolean>(false);

  useEffect(() => {
    if (paid) {
      setSubmitted(true);
      setMustSubmitted(true);
    } else {
      setMustSubmitted(false);
    }
  }, [paid]);

  useEffect(() => {
    setDuration(getTimeBetween({ endTime, startTime, date }));
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

  const handleSubmit = async () => {
    const userCollection = collection(db, 'users', user.uid, 'times');
    const timesDoc = doc(userCollection);

    setDoc(timesDoc, {
      date,
      startTime,
      endTime,
      duration,
      submitted,
      paid,
    })
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
          <Input
            type="checkbox"
            label="Eingereicht"
            checked={submitted}
            onChange={() => setSubmitted(!submitted)}
            disabled={mustSubmitted}
          />
          <Input
            type="checkbox"
            label="Ausgezahlt"
            checked={paid}
            onChange={() => setPaid(!paid)}
          />
        </TimeInputWrapper>
        <Text variant="normal">Du hast {duration} h gearbeitet</Text>
        <Button label="Speichern" onClick={handleSubmit} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default AddTimePage;