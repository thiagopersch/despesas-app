import { Box } from '@mui/material';
import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  box-shadow: 24rem;
  padding: 2rem;
  margin: 0.5rem;
  width: 100%;
  max-width: 50rem;
  outline: none;
  gap: 2rem;

  ${media.lessThan('medium')`
    width: 100%;
    max-width: 100%;
  `}
`;

export const WrapperInputs = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 45rem;

  ${media.lessThan('medium')`
    width: 100%;
    max-width: 100%;
  `}
`;

export const WrapperCTA = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;

  ${media.lessThan('medium')`
    padding: 1rem 0rem;
  `}
`;
