import type { NextPage } from 'next';
import styled from 'styled-components';
import { CustomLink, Text } from '../components/text';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 2rem;
  text-align: center;
  width: 100%;
`;

const Home: NextPage = (): JSX.Element => {
  return (
    <Wrapper>
      <Text variant="headline">Willkommen!</Text>
      <CustomLink variant="normal" href="authes/login">
        Login
      </CustomLink>
      <CustomLink variant="small" href="authes/signup">
        Noch kein Konto?
      </CustomLink>
    </Wrapper>
  );
};

export default Home;
