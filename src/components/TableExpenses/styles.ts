import styled, { css } from "styled-components";
import media from "styled-media-query";

export const CTA = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;

    ${media.lessThan("medium")`
      margin: 0.5rem;

      & > button {
        width: 100vw;
      }
    `}
  `}
`;
