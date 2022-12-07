import { useContext } from 'react';
import styled from 'styled-components';
import { CustomLink, Text } from '../components/text';
import { AuthContext } from '../firebase/context';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  justify-items: center;
`;

const HomePage = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <Wrapper>
          <Text variant="headline">{`Wilkommen ${user.displayName}`}</Text>
          <Text variant="normal">{`Hallo! Du bist angemeldet mit der E-Mail-Adresse: ${user.email}`}</Text>
          <Text variant="normal" style={{ marginBottom: '2rem' }}>
            Nice, dass du wieder da bist
          </Text>
          <CustomLink variant="normal" href="profile">
            Profil bearbeiten
          </CustomLink>
        </Wrapper>
      )}
    </>
  );
};

export default HomePage;
