import { Box } from '@mui/material';
import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 2rem 5rem;

  ${media.lessThan('medium')`
    padding: 2rem 2rem;
  `}
`;

export const WrapperInputs = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
  `}
`;

export const SectionOne = styled(Box)`
  display: flex;
  flex-direction: column;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
  `}
`;

export const SectionTwo = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
  `}
`;

export const SectionThree = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
  `}
`;

export const SectionCheckboxes = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
  `}
`;

export const SectionSelects = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  ${media.lessThan('medium')`
    flex-direction: column;
    padding: 0rem;
  `}
`;

export const WrapperCTA = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1vw 0vw;

  ${media.lessThan('medium')`
    flex-direction: column-reverse;
    padding: 1rem 0rem;
  `}
`;
