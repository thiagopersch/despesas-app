import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 1.5rem;
    padding: 0 30vw;

    ${media.lessThan("medium")`
      padding: 0 10vw;
    `}
  `}
`;
