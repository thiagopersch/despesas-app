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

  ${media.lessThan('medium')`
    width: 100%;
    max-width: 100%;
  `}
`;

export const WrapperInputs = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.lessThan('medium')`
    width: 100%;
    max-width: 100%;
  `}
`;

export const WrapperButtonColorPicker = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 10vw;
  max-width: 22vw;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
    max-width: 10vw;
  `}
`;

export const WrapperColorPicker = styled(Box)`
  padding: 0 10vw;
  width: 40vw;

  ${media.lessThan('medium')`
    padding: 0rem;
    width: 100%;
  `}
`;

export const WrapperCTA = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1vw 0vw;

  ${media.lessThan('medium')`
    flex-direction: column-reverse;
    width: 100%;
    padding: 1rem 0rem;
  `}
`;
