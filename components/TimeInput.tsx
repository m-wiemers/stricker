import { useState } from 'react';
import styled from 'styled-components';
import { Hours, Minutes } from '../helper/TimeSelections';
import Input from './Input';

type Props = {
  value?: string;
  defaultValue?: `${string}:${string}`;
};

type SelectProps = {
  isOpen: boolean;
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
`;

const Select = styled.div`
  width: 50px;
  top: 30px;
  left: 25px;
  background-color: white;
  position: absolute;
  display: ${({ isOpen }: SelectProps) => (isOpen ? 'grid' : 'none')};

  grid-template-columns: 1fr 1fr;
`;

const SelectSection = styled.div`
  color: white;
  width: 50px;
  display: grid;
  justify-content: center;

  :hover {
    background-color: yellow;
  }
`;

const InnerSelect = styled.div`
  max-height: 200px;
`;

const TimeInput = ({ value, defaultValue }: Props): JSX.Element => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [hour, setHour] = useState<string>(defaultValue?.slice(0, 2) || '');
  const [minute, setMinute] = useState<string>(
    defaultValue?.split(':').pop() || ''
  );

  const handleSelect = (value: string, target: string) => {
    if (target === 'hour') {
      setHour(value);
    }
    if (target === 'minute') {
      setMinute(value);
      setOpenSelect(false);
    }
  };

  const hourSelect = Hours.map((hour) => (
    <SelectSection key={hour} onClick={() => handleSelect(hour, 'hour')}>
      {hour}
    </SelectSection>
  ));

  const MinuteSelect = Minutes.map((minute) => (
    <SelectSection key={minute} onClick={() => handleSelect(minute, 'minute')}>
      {minute}
    </SelectSection>
  ));

  return (
    <Wrapper>
      <Input
        type="text"
        onFocus={() => setOpenSelect(true)}
        value={`${hour}:${minute}`}
      />
      <Select isOpen={openSelect} onMouseLeave={() => setOpenSelect(false)}>
        <InnerSelect>{hourSelect}</InnerSelect>
        <InnerSelect>{MinuteSelect}</InnerSelect>
      </Select>
    </Wrapper>
  );
};

export default TimeInput;
