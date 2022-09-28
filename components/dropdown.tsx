import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { Text } from './text';

type Props = {
  list: string[];
  label?: string;
  selected: string;
  onSelect: ChangeEventHandler<HTMLSelectElement>;
};

const Wrapper = styled.div`
  background-color: transparent;
  text-align: start;
`;

const StyledDropdown = styled.select`
  width: 100%;
  border: 2px solid;
  color: white;
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 2px 2px 10px white;
`;

const Dropdown = ({ list, selected, onSelect, label }: Props): JSX.Element => {
  selected = selected || 'Kein Einsatzort';
  const listItems = list.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <Wrapper>
      {label && <Text variant="label">{label}</Text>}
      <StyledDropdown onChange={onSelect} value={selected}>
        {listItems}
      </StyledDropdown>
    </Wrapper>
  );
};

export default Dropdown;
