import styled from 'styled-components';
import { Text } from '../components/text';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  justify-items: center;
`;

const HomePage = (): JSX.Element => {
  return (
    <Wrapper>
      <Text variant="headline">Wilkommen</Text>
    </Wrapper>
  );
};

export default HomePage;
