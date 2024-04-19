import styled, { css } from "styled-components";
import media from "styled-media-query";

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.small};
    transition: ${theme.transitions.fast};

    ${media.lessThan("medium")`
      font-size: ${theme.fonts.sizes.xxsmall};
      transition: ${theme.transitions.fast};
    `}
  `}
`;

export const WrapperNavbar = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 2rem;

    ${media.lessThan("medium")`;
      display: none;
    `};
  `}
`;

export const WrapperIconNavbar = styled.div`
  display: none;

  ${media.lessThan("medium")`
    display: block;
    gap: 2rem;
    flex-direction: column;
    padding: 1rem 1.5rem;
  `}
`;

export const Ocult = styled.div`
  display: none;

  ${media.lessThan("medium")`
    display: block;

  `}
`;
