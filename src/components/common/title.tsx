import clsx from 'clsx';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TitleColor = 'default' | 'primary' | 'danger' | 'gray';

type Props = {
  as?: HeadingTag;
  color?: TitleColor;
  children: React.ReactNode;
};

const sizeClassName: Record<HeadingTag, string> = {
  h1: 'text-6xl',
  h2: 'text-5xl',
  h3: 'text-3xl',
  h4: 'text-4xl',
  h5: 'text-2xl',
  h6: 'text-xl',
};
const colorClassName = {
  default: 'text-black',
  primary: 'text-primary',
  danger: 'text-red-600',
  gray: 'text-gray-400',
};

const Title = ({ as = 'h6', color = 'default', children }: Props) => {
  const Component = as;
  const titleClassName = clsx('font-bold', sizeClassName[as], colorClassName[color]);

  return <Component className={titleClassName}>{children}</Component>;
};

export default Title;
