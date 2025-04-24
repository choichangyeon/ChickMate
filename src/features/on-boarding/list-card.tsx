import Link from 'next/link';
import Typography from '@/components/ui/typography';
import type { OnBoardingCard } from '@/features/on-boarding/data/on-boarding-list';

const ListCard = ({ title, content, icon, path }: OnBoardingCard) => {
  return (
    <Link href={path}>
      <section role='link' className='flex h-[122px] items-center rounded-xl border p-4'>
        <div className='mr-4'>{icon}</div>
        <div>
          <Typography as='h1' weight='bold'>
            {title}
          </Typography>
          <p className='mt-1 whitespace-pre-line'>{content}</p>
        </div>
      </section>
    </Link>
  );
};

export default ListCard;
