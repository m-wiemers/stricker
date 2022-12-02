import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '../helper/formatter';
import DeleteIcon from './icons/deleteIcon';
import EditIcon from './icons/editIcon';
import Input from './Input';
import { Text } from './text';

type Props = {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onCheckSubmitted: (index: ChangeEvent) => void;
  onCheckPaid: (index: ChangeEvent) => void;
};

export type Times = {
  id: string;
  date: string;
  startTime: `${string}:${string}`;
  endTime: `${string}:${string}`;
  duration: string;
  submitted: boolean;
  paid: boolean;
};

type IconProps = {
  left?: boolean;
};

const Wrapper = styled.div`
  position: relative;
  border: 2px solid white;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 2px 2px 4px white;
  margin: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.5rem;
`;

const IconWrapper = styled.button`
  position: absolute;
  border: none;
  cursor: pointer;
  top: 0.2rem;
  right: ${({ left }: IconProps) => left && '0.2rem'};
  left: ${({ left }: IconProps) => !left && '0.2rem'};
`;

const TimesCard = ({
  date,
  startTime,
  endTime,
  duration,
  submitted,
  paid,
  id,
  onDelete,
  onEdit,
  onCheckPaid,
  onCheckSubmitted,
}: Times & Props): JSX.Element => {
  return (
    <Wrapper>
      <IconWrapper title="Löschen" onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconWrapper>
      <IconWrapper left title="Bearbeiten" onClick={() => onEdit(id)}>
        <EditIcon />
      </IconWrapper>
      <Text style={{ gridColumn: '1/3' }} variant="normal">
        Datum: {formatDate(date)}
      </Text>
      <Text variant="normal">Von: {startTime}</Text>
      <Text variant="normal">Bis: {endTime}</Text>
      <Text style={{ gridColumn: '1/3' }} variant="normal">
        Stunden: {duration}
      </Text>
      <Input
        type="checkbox"
        label="Eingereicht"
        defaultChecked={submitted}
        onChange={(index) => onCheckSubmitted(index)}
      />
      <Input
        type="checkbox"
        label="Ausbezahlt"
        defaultChecked={paid}
        onChange={(index) => onCheckPaid(index)}
      />
    </Wrapper>
  );
};

export default TimesCard;
