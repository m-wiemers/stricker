import { CustomLink, Text } from '../../components/text';

const SignedOutPage = (): JSX.Element => {
  return (
    <>
      <Text variant="headline">Du wurdest erfolgreich abgemeldet.</Text>
      <CustomLink color="blue" variant="normal" href="/">
        Zurück nach hause
      </CustomLink>
    </>
  );
};

export default SignedOutPage;
