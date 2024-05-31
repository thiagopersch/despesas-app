import { ReactNode } from 'react';
import * as S from './styles';

type CTAProps = {
  children?: ReactNode;
};

const CTA = ({ children }: CTAProps) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default CTA;
