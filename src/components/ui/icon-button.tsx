import clsx from 'clsx';

type IconButtonProps = {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
};

const IconButton = ({ onClick, ariaLabel, className, children }: IconButtonProps) => (
  <button type='button' onClick={onClick} aria-label={ariaLabel} className={clsx('cursor-pointer', className)}>
    {children}
  </button>
);

export default IconButton;
