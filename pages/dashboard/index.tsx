import styled from 'styled-components';
import { CustomLink, Text } from '../../components/text';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  text-align: center;
  row-gap: 1rem;
`;

const TextWrapper = styled.div`
  display: grid;
  max-width: 25rem;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const Dashboard = (): JSX.Element => {
  return (
    <Wrapper>
      <Text variant="headline">Willkommen im Dashboard</Text>
      <TextWrapper>
        <Text variant="normal">
          Kleine Erklärung: Unter --Konzerte-- lassen sich Konzerte anlegen. Die
          Links können dann an die entsprechende Band gereicht werden.
        </Text>
        <Text variant="normal">
          Unter --Mitarbeiter-- lassen sich Mitarbeiter anlegen inkl. ihren
          Standard-Bereich anlegen.
        </Text>
        <Text variant="normal">
          Unter --Personalplanung-- kannst du angelegte Mitarbeiter für die
          angelegten Konzerte planen. Es lässt sich noch einstellen, dass auch
          nur registrierte Mitarbeiter die Personalplanung sehen können.
        </Text>
        <CustomLink color="blue" href="/personal" variant="normal">
          Die Ergebnisse lassen sich dann auch hier sehen.
        </CustomLink>
        <Text variant="normal">
          Das sieht hier alles noch nicht so toll aus, aber das lässt sich nach
          und nach ändern
        </Text>
      </TextWrapper>
    </Wrapper>
  );
};

export default Dashboard;
