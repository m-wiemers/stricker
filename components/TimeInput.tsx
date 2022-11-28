import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Hours, Minutes } from '../helper/TimeSelections';
import Input from './Input';

type Props = {
  handleChange: (value: string, target: string) => void;
  value: string;
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
  cursor: pointer;
  background-color: grey;

  :hover {
    background-color: yellow;
  }
`;

const InnerSelect = styled.div`
  max-height: 200px;
`;

const TimeInput = ({ handleChange, value }: Props): JSX.Element => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const input = window.document.getElementById('input');
      if (input && !openSelect) {
        input.blur();
      }
    }
  }, [openSelect]);

  const handleChangeThis = (value: string, target: string) => {
    if (target === 'hour') {
      handleChange(value, target);
    }
    if (target === 'minute') {
      handleChange(value, target);
      setOpenSelect(false);
    }
  };

  const hourSelect = Hours.map((hour) => (
    <SelectSection key={hour} onClick={() => handleChangeThis(hour, 'hour')}>
      {hour}
    </SelectSection>
  ));

  const MinuteSelect = Minutes.map((minute) => (
    <SelectSection
      key={minute}
      onClick={() => handleChangeThis(minute, 'minute')}
    >
      {minute}
    </SelectSection>
  ));

  return (
    <Wrapper>
      <Input
        style={{ cursor: 'pointer', maxWidth: '6rem', textAlign: 'center' }}
        type="text"
        onFocus={() => setOpenSelect(true)}
        value={value}
        id="input"
      />
      <Select isOpen={openSelect} onMouseLeave={() => setOpenSelect(false)}>
        <InnerSelect>{hourSelect}</InnerSelect>
        <InnerSelect>{MinuteSelect}</InnerSelect>
      </Select>
    </Wrapper>
  );
};

export default TimeInput;
