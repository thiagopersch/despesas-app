import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
  `};
`;

export const Fields = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: ${theme.spacings.xxsmall} ${theme.spacings.xhuge};

    ${media.lessThan("medium")`
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
    `}
  `}
`;

export const CTA = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: ${theme.spacings.small} ${theme.spacings.xhuge};

    > a,
    button {
      width: 100%;
    }

    ${media.lessThan("medium")`
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
      margin: ${theme.spacings.xsmall};
    `}
  `}
`;
