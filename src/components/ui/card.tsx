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
    <div className={clsx(cardClassName, className)} onClick={onClick}>
      {/* content area */}
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

export default Card;
//TODO: bg-emerald-900/0 -> color 수정, outline-gray-200 -> color 수정
const cardClassName = clsx(
  'relative flex-shrink-0 items-start justify-between rounded-lg bg-cool-gray-10 outline outline-1 outline-offset-[-1px] outline-cool-gray-200',
  'min-w-[380px] min-h-[180px] p-6'
);

const contentClassName = clsx('flex h-full flex-col justify-between');
