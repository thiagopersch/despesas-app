import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  margin: 1rem 0;

  ${media.lessThan('medium')`
    & > button {
      width: 100vw;
    }
  `}
`;
