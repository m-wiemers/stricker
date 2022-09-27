import type { NextPage } from 'next';
import { addListener } from 'process';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import { auth } from '../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 1rem;
`;

const Home: NextPage = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const handleSignin = () => {
    auth
      .signInWithEmailAndPassword(email, pw)
      .then(() => {
        if (auth.currentUser?.emailVerified) {
          const userId = auth.currentUser.uid;
          console.log(userId);
        } else {
          const emailAdress = auth.currentUser?.email;
          console.log('not verified', emailAdress);
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Wrapper>
      <p>login</p>
      <Input
        type="text"
        label="E-Mail-Adresse"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        label="Passwort"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <Button label="Anmelden" onClick={handleSignin} />
    </Wrapper>
  );
};

export default Home;
