import styled from 'styled-components';
import { CustomLink } from '../../components/text';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  max-width: 420px;
  min-width: 420px;
`;

const TimesOverviewPage = (): JSX.Element => {
  return (
    <Wrapper>
      <InnerWrapper>
        <CustomLink variant="normal" href="/times/addTimes" color="blue">
          Neue Zeiten eintragen
        </CustomLink>
      </InnerWrapper>
    </Wrapper>
  );
};

export default TimesOverviewPage;
