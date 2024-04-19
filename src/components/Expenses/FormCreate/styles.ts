import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;

    ${media.lessThan("medium")`
      font-size: ${theme.fonts.sizes.xsmall};
    `}
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

    ${media.lessThan("medium")`
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: ${theme.spacings.xsmall};
    `}
  `}
`;
