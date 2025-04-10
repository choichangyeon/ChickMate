import clsx from 'clsx';
import { fontAlign, fontColor, titleFontSize } from '@/styles/typography-styles';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TitleSize = keyof typeof titleFontSize;
type TitleColor = keyof typeof fontColor;
type TextAlign = keyof typeof fontAlign;

type Props = {
  as?: HeadingTag;
  size?: TitleSize;
  color?: TitleColor;
  align?: TextAlign;
  children: React.ReactNode;
};

/**
 * Title 컴포넌트
 * @param as heading 태그
 * @param size 폰트 크기
 * @param color 폰트 컬러
 * @returns JSX
 */
const Title = ({ as = 'h1', size = 'xl', color = 'default', align = 'left', children }: Props) => {
  const Component = as;
  const titleClassName = clsx('font-bold', titleFontSize[size], fontColor[color], fontAlign[align]);

  return <Component className={titleClassName}>{children}</Component>;
};

export default Title;
