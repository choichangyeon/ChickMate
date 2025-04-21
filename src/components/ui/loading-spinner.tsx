import clsx from 'clsx';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
};

const spinnerSize = {
  'sm': 'h-8 w-8',
  'md': 'h-12 w-12',
  'lg': 'h-16 w-16',
  'xl': 'h-20 w-20',
  '2xl': 'h-24 w-24',
  '3xl': 'h-28 w-28',
};

const LoadingSpinner = ({ size = 'md' }: Props) => {
  return (
    <div
      role='status'
      aria-label='로딩 중'
      className={clsx(
        'animate-spin rounded-full border-4 border-b-secondary-amber border-l-secondary-yellow border-r-secondary-amber border-t-secondary-yellow opacity-80',
        spinnerSize[size]
      )}
    />
  );
};

export default LoadingSpinner;
