import { Box, Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Content = styled(Box)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    padding: 5rem;
    margin: 2rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    ${media.lessThan('medium')`
      padding: 4rem;
    `}
  `}
`;

export const Title = styled(Typography)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.small};
    text-align: center;

    ${media.lessThan('medium')`
      font-size: 1.3rem;
    `}
  `}
`;

export const Message = styled(Typography)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xxsmall};
    color: ${theme.colors.gray};
    text-align: center;
  `};
`;

export const CTA = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
