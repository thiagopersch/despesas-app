import { Box } from '@mui/material';
import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10vw;

  ${media.lessThan('medium')`
    padding: 10rem 2rem;
  `}
`;

export const WrapperInputs = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0 10vw;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
  `}
`;

export const WrapperButtonColorPicker = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 10vw;
  max-width: 23vw;

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

export const WrapperCheckboxAndText = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 10vw;

  ${media.lessThan('medium')`
    padding: 0rem;
  `}
`;

export const WrapperCTA = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5vw 10vw;

  ${media.lessThan('medium')`
    padding: 1rem 0rem;
  `}
`;
