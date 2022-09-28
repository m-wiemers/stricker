import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link, Text } from '../components/text';
import { auth } from '../firebase';
import { AuthContext } from '../firebase/context';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 1rem;
  text-align: center;
`;

const InnerWrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 0.7rem;
`;

const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const { user } = useContext(AuthContext);

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
      .catch((error: any) => alert(error.message));
  };

  return (
    <Wrapper>
      {!user ? (
        <>
          <Text variant="normal">WILLKOMMEN</Text>
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
          <Button
            label="Anmelden"
            onClick={handleSignin}
            disabled={pw.length <= 0 || email.length <= 0}
          />
          <Link variant="small" href="authes/forgotPassword">
            Passwort vergessen
          </Link>
        </>
      ) : (
        <>
          <p>Du bist angemeldet mit der E-Mail-Adresse {user.email}</p>
          <InnerWrapper>
            <Button
              label="Zum Personalplan"
              onClick={() => router.push('personal')}
            />
            <Button label="Logout" onClick={() => auth.signOut()} />
          </InnerWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
