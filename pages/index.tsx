import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Text } from '../components/text';
import { auth } from '../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 0.7rem;
  width: 100%;
`;

const Home: NextPage = (): JSX.Element => {
  const router = useRouter();

  return (
    <Wrapper>
      <Text variant="headline">Willkommen!</Text>
    </Wrapper>
  );
};

export default Home;
