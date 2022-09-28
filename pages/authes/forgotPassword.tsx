import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Text } from '../../components/text';
import { auth } from '../../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 1rem;
`;

const ForgotPassword = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  const handlePasswortReset = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => alert(`Wir haben dir eine E-Mail an ${email} gesendet`))
      .catch((err) => console.log(err.message));

    setTimeout(() => router.push('/'), 5000);
  };

  return (
    <Wrapper>
      <Text variant="normal" marginBottom="1.5rem">
        Passwort vergessen?
      </Text>
      <Input
        label="E-Mail-Adresse"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        label="Absenden"
        disabled={email.length <= 0}
        onClick={handlePasswortReset}
      />
    </Wrapper>
  );
};

export default ForgotPassword;
