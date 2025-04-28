import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
/**
 * @param children - ReactNode
 * @param className - tailwind className
 * @param onClick - onClick event handler
 */
const Card = ({ children, className, onClick }: Props) => {
  return (
    <li className={clsx(cardClassName, className)} onClick={onClick}>
      {/* content area */}
      <div className={contentClassName}>{children}</div>
    </li>
  );
};

export default Card;
const cardClassName = clsx(
  'relative flex-shrink-0 items-start justify-between rounded-lg bg-cool-gray-10 outline outline-1 outline-offset-[-1px] outline-cool-gray-200 list-none',
  'min-w-[320px] min-h-[180px] p-6'
);

const contentClassName = clsx('flex h-full w-full flex-col justify-between');
