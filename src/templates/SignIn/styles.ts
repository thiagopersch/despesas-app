import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    margin: -5rem auto;

    ${media.lessThan("medium")`
      padding: 0 10%;
      width: 100%;
    `}
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 2rem;

  ${media.lessThan("medium")`
      padding: 10%;
      width: 100vw;
    `}
`;
