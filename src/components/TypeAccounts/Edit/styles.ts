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
  gap: '2rem';

  ${media.lessThan('medium')`
    width: 100%;
    max-width: 100%;
  `};
`;

export const WrapperInputs = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 45rem;

  ${media.lessThan('medium')`
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  `}
`;

export const WrapperInputsTwo = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 45rem;

  ${media.lessThan('medium')`
    width: 100%;
    max-width: 100%;
  `}
`;

export const WrapperButtonColorPicker = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 2.5rem;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
    max-width: 10vw;
  `}
`;

export const WrapperColorPicker = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 17%;

  ${media.lessThan('medium')`
    padding: 0rem;
    width: 100%;
  `}
`;

export const ColorPicker = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 6.7rem;
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
