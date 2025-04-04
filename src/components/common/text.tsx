import clsx from 'clsx';

type TextSize = 'xs' | 'sm' | 'md' | 'lg';
type TextColor = 'default' | 'primary' | 'danger' | 'gray';

type Props = {
  size?: TextSize;
  color?: TextColor;
  children: React.ReactNode;
};

const sizeClassName = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const colorClassName = {
  default: 'text-black',
  primary: 'text-primary',
  danger: 'text-red-600',
  gray: 'text-gray-400',
};

const Text = ({ size = 'md', color = 'default', children }: Props) => {
  const textClassName = clsx('font-normal', sizeClassName[size], colorClassName[color]);

  return <p className={textClassName}>{children}</p>;
};

export default Text;
