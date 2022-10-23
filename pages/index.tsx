import type { NextPage } from 'next';
import styled from 'styled-components';
import { CustomLink, Text } from '../components/text';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 0.7rem;
  width: 100%;
`;

const Home: NextPage = (): JSX.Element => {
  return (
    <Wrapper>
      <Text variant="headline">Willkommen!</Text>
      <CustomLink variant="small" href="authes/signup">
        Noch kein Konto?
      </CustomLink>
    </Wrapper>
  );
};

export default Home;
