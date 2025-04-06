import clsx from 'clsx';
import { fontColor, textFontSize } from '@/styles/typography-styles';

type TextSize = keyof typeof textFontSize;
type TextColor = keyof typeof fontColor;

type Props = {
  size?: TextSize;
  color?: TextColor;
  children: React.ReactNode;
};

/**
 * Text 컴포넌트
 * @param size 폰트 크기
 * @param color 폰트 컬러
 * @returns JSX
 */
const Text = ({ size = 'md', color = 'default', children }: Props) => {
  const textClassName = clsx('font-normal', textFontSize[size], fontColor[color]);

  return <p className={textClassName}>{children}</p>;
};

export default Text;
