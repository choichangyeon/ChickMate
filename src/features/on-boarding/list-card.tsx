import Typography from '@/components/ui/typography';
import type { OnBoardingCard } from '@/features/on-boarding/data/on-boarding-list';

const ListCard = ({ title, content, icon }: OnBoardingCard) => {
  return (
    <section className='flex items-center rounded-xl border p-4'>
      <div className='mr-4'>{icon}</div>
      <div>
        <Typography as='h2' weight='bold'>
          {title}
        </Typography>
        <p className='mt-1 whitespace-pre-line'>{content}</p>
      </div>
    </section>
  );
};

export default ListCard;
