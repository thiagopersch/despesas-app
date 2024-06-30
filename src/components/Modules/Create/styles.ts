import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10vw;

  ${media.lessThan('medium')`
    padding: 10rem 2rem;
  `}
`;

export const WrapperInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 20vw;

  ${media.lessThan('medium')`
    padding: 0rem;
  `}
`;

export const WrapperCTA = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5vw 20vw;

  ${media.lessThan('medium')`
    padding: 1rem 0rem;
  `}
`;
