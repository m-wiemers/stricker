import styled from 'styled-components';
import MetalHandIcon from './icons/metalHand';
import { Text } from './text';

const Container = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  justify-items: center;
  text-align: center;
  gap: 2rem;
`;

const StyledIconContainer = styled.div`
  animation-name: breath-animation;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;

  @keyframes breath-animation {
    0% {
      opacity: 1;
      margin-top: 0rem;
    }
    50% {
      opacity: 0.3;
      margin-top: 1rem;
    }
    100% {
      opacity: 1;
      margin-top: 0rem;
    }
  }
`;

const LoadingScreen = (): JSX.Element => {
  return (
    <Container>
      <Text variant="headline">Loading...</Text>
      <StyledIconContainer>
        <MetalHandIcon />
      </StyledIconContainer>
    </Container>
  );
};

export default LoadingScreen;
