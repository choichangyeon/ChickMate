import clsx from 'clsx';
import Typography from '@/components/ui/typography';
import { DEFAULT } from '@/constants/user-meta-data-constants';

type Props = {
  type: 'jobPosting' | 'resume' | 'default';
  children?: React.ReactNode;
  className?: string;
  subTitle?: string;
  mainTitle: string;
  content?: string;
  // TODO: iconButton type 수정
  iconButton?: boolean;
  onClick?: () => void;
};

const Card = ({ type = 'default', children, className, mainTitle, subTitle, content, iconButton, onClick }: Props) => {
  const textBox = () => {
    switch (type) {
      case 'resume':
        return;
      case 'jobPosting':
        return;
      default:
        return null;
    }
  };
  if (type === 'jobPosting') {
    const textBox = (
      <div>
        {subTitle && (
          <Typography size='sm' color='gray-500'>
            {subTitle}
          </Typography>
        )}
        <Typography as='h3' weight='bold' className='line-clamp-2'>
          {mainTitle}
        </Typography>
        {content && <Typography className={contentClassName}>{content}</Typography>}
      </div>
    );
  }
  return (
    <section className={clsx(cardClassName, className)} onClick={onClick}>
      {iconButton && (
        // TODO: iconButton component 적용
        <div className='absolute right-[20px] top-[12px] h-6 w-6'>
          <div className='absolute left-[4px] top-[4px] h-0.5 w-4 bg-black' />
          <div className='absolute left-[8px] top-[2px] h-1 w-2 bg-black' />
          <div className='absolute left-[5px] top-[8px] h-3.5 w-3.5 bg-black' />
        </div>
      )}
      <div className='flex h-full flex-col justify-between'>
        {textBox}
        {/* badge area */}
        <div className={badgeClassName}>{children}</div>
      </div>
    </section>
  );
};

export default Card;
//TODO: bg-emerald-900/0 -> color 수정, outline-gray-200 -> color 수정
const cardClassName = clsx(
  'bg-emerald-900/0 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex-col justify-between items-start',
  'w-[307px] h-[173px] p-[24px]'
);

const contentClassName = clsx('text-sm font-normal text-black/50', 'line-clamp-1');

const badgeClassName = clsx('flex gap-[16px]');
