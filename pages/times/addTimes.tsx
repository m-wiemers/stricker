import { useContext, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import TimeInput from '../../components/TimeInput';
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
`;

const AddTimePage = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const today = DateToString({ today: true });
  const [name, setName] = useState<string>(user.displayName || '');
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<`${string}:${string}`>('18:00');

  const handleChange = (value: string, target: string) => {
    if (target === 'hour') {
      setStartTime(`${value}:${startTime.split(':').pop()}`);
    }

    if (target === 'minute') {
      setStartTime(`${startTime.slice(0, 2)}:${value}`);
    }
  };

  return (
    <Wrapper>
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
        <TimeInput value={startTime} handleChange={handleChange} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default AddTimePage;
