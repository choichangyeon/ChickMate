import Link from 'next/link';
import Typography from '@/components/ui/typography';
import type { OnBoardingCard } from '@/features/on-boarding/data/on-boarding-list';

const ListCard = ({ title, content, icon, path }: OnBoardingCard) => {
  return (
    <Link href={path}>
      <section
        role='link'
        className='mb-4 flex h-[122px] items-center rounded-xl border p-4 mobile:mb-2 mobile:h-24 mobile:min-w-72 tablet:h-[150px] desktop:mb-0'
      >
        <div className='mr-4 mobile:mr-0'>{icon}</div>
        <div>
          <Typography as='h2' className='font-bold mobile:text-sm'>
            {title}
          </Typography>
          <p className='mt-1 whitespace-pre-line mobile:hidden'>{content}</p>
        </div>
      </section>
    </Link>
  );
};

export default ListCard;
