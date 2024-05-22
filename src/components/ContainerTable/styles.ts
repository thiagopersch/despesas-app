import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    padding: 0rem 5rem 5rem;

    ${media.lessThan('medium')`
      padding: 0 1rem 2rem;
    `}
  `}
`;
