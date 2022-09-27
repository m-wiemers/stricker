import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import { auth } from '../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 0.5rem;
`;

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, pw)
      .then((userCredentials) => {
        const user = userCredentials.user;
        user?.sendEmailVerification();
        {
          user &&
            alert(
              `Danke! Bitte Bestätige deine Email-Adresse mit der Email, die wir dir gesendet haben an: ${user.email}`
            );
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Wrapper>
      <p>Konto erstellen</p>
      <Input
        type="text"
        label="E-Mail-Adresse"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="passwort"
        label="Passwort"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <Button label="Anmelden" onClick={handleSignup} />
    </Wrapper>
  );
};

export default SignUpPage;
