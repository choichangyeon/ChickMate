import clsx from 'clsx';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TitleSize = 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
type TitleColor = 'default' | 'primary' | 'danger' | 'gray';

type Props = {
  as?: HeadingTag;
  size?: TitleSize;
  color?: TitleColor;
  children: React.ReactNode;
};

const sizeClassName = {
  'xl': 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
};

const colorClassName = {
  default: 'text-black',
  primary: 'text-primary',
  danger: 'text-red-600',
  gray: 'text-gray-400',
};

const Title = ({ as = 'h1', size = 'xl', color = 'default', children }: Props) => {
  const Component = as;
  const titleClassName = clsx('font-bold', sizeClassName[size], colorClassName[color]);

  return <Component className={titleClassName}>{children}</Component>;
};

export default Title;
