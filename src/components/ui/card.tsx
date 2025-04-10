import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  date: string;
  // TODO: iconButton type 수정
  iconButton?: boolean;
  onClick?: () => void;
};

const Card = ({ children, className, date, title, iconButton, onClick }: Props) => {
  const cardClassName =
    'relative w-72 h-40 bg-emerald-900/0 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 overflow-hidden';

  return (
    <div className={clsx(cardClassName, className)} onClick={onClick}>
      {iconButton && (
        // TODO: iconButton component 적용
        <div className='absolute right-[20px] top-[12px] h-6 w-6'>
          <div className='absolute left-[4px] top-[4px] h-0.5 w-4 bg-black' />
          <div className='absolute left-[8px] top-[2px] h-1 w-2 bg-black' />
          <div className='absolute left-[5px] top-[8px] h-3.5 w-3.5 bg-black' />
        </div>
      )}
      {/* TODO: 반응형 사이즈 추가하기 */}
      <div className='absolute left-[20px] top-[25px] justify-start text-sm font-normal leading-tight text-black/50'>
        {date}
      </div>
      <div className='absolute left-[20px] top-[43px] w-52 justify-start text-base font-bold leading-normal text-black'>
        {title}
      </div>
      {/* TODO: badge area */}
      <div className='absolute left-[20px] top-[117px] flex gap-[16px]'>{children}</div>
    </div>
  );
};

export default Card;
