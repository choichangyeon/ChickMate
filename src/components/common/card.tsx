import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  className?: string;
  subTitle?: string;
  mainTitle: string;
  content?: string;
  // TODO: iconButton type 수정
  iconButton?: boolean;
  onClick?: () => void;
};

const Card = ({ children, className, mainTitle, subTitle, content, iconButton, onClick }: Props) => {
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
      {/* TODO: 반응형 크기 재정의 */}
      <div className='flex h-full flex-col justify-between'>
        {/* 텍스트 컨텐츠 조절*/}
        <div>
          {subTitle && <div className={subClassName}>{subTitle}</div>}
          <div className={mainClassName}>{mainTitle}</div>
          {content && <div className={contentClassName}>{content}</div>}
        </div>
        {/* badge area */}
        <div className={badgeClassName}>{children}</div>
      </div>
    </div>
  );
};

export default Card;

const cardClassName = clsx(
  'relative bg-emerald-900/0 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 ',
  'w-[288px] h-[160px] p-[20px]'
  //   TODO: 반응형 크기 재정의
  //   'sm:w-[320px] sm:h-[176px] sm:p-[30px]',
  //   'md:w-[384px] md:h-[224px] md:p-[40px]',
  //   'lg:w-[400px] lg:h-[240px] lg:p-[50px]'
);

// TODO: 반응형 크기 재정의
const subClassName = clsx('text-sm font-normal text-black/50', 'line-clamp-1');
const mainClassName = clsx('text-base font-bold text-black', 'line-clamp-2');
const contentClassName = clsx('text-sm font-normal text-black/50', 'line-clamp-1');

const badgeClassName = clsx('flex gap-[16px]');
