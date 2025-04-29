import { Star } from '@/components/icons/star';
import LinkButton from '@/components/ui/link-button';
import Typography from '@/components/ui/typography';
import { useBookmarkMutation } from '@/features/job/hooks/use-bookmark-mutation';
import type { JobPostingType } from '@/types/DTO/job-posting-dto';
import type { UserType } from '@/types/DTO/user-dto';
import type { UserSelectedJobType } from '@/types/DTO/user-selected-job-dto';
import { formatRemainDay } from '@/utils/format-remain-day';
import { formatTimestamp } from '@/utils/format-timestamp';
import clsx from 'clsx';

const experienceType: Record<number, string> = {
  0: '경력무관',
  1: '신입',
  2: '경력',
  3: '신입/경력',
};

type Props = {
  bookmark: UserSelectedJobType & { jobPosting: JobPostingType };
  index: number;
  length: number;
  userId: UserType['id'];
};

const BookmarkTab = ({ bookmark, index, length, userId }: Props) => {
  const { mutate: bookmarkMutate } = useBookmarkMutation({
    jobPostingId: bookmark.jobPostingId,
    userId,
  });

  const { jobPosting } = bookmark;
  const { companyName, positionTitle, experienceCode } = jobPosting;

  const postedAtDate = formatTimestamp({ input: jobPosting.openingTimestamp });
  const expiredAtDate = formatTimestamp({ input: jobPosting.expirationTimestamp });
  const remainDay = formatRemainDay(jobPosting.expirationTimestamp);

  const handleDeleteBookmark = () => {
    bookmarkMutate(true);
  };

  return (
    <li className={clsx('flex flex-col items-center py-4', length !== index + 1 && 'border-b')}>
      <div className='flex w-full flex-row items-start justify-between'>
        <div>
          <Typography size='sm' color='gray-500' weight='bold'>
            {companyName}
          </Typography>
          <Typography className='line-clamp-1 text-lg font-bold mobile:text-base'>{positionTitle}</Typography>
        </div>
        <button type='button' onClick={handleDeleteBookmark} aria-label='북마크 버튼'>
          <Star width='18' height='18' color='#FDE047' stroke='#FDE047' />
        </button>
      </div>
      <div className='flex w-full flex-row items-center justify-between'>
        <div className='flex flex-row gap-6 mobile:flex-col mobile:gap-2'>
          <Typography size='xs' color='gray-500'>
            {experienceType[experienceCode]}
          </Typography>
          <Typography size='xs' color='gray-500'>
            {postedAtDate}~{expiredAtDate}
          </Typography>
        </div>
        <div className='flex flex-row items-center justify-between gap-3 mobile:flex-col mobile:gap-1'>
          {remainDay ? (
            <Typography color='primary-600'>D-{remainDay}</Typography>
          ) : (
            <Typography className='text-primary-orange-600 mobile:text-sm'>날짜정보 오류</Typography>
          )}
          {bookmark.jobPosting.url && (
            <LinkButton target='_blank' size='small' href={bookmark.jobPosting.url} square>
              바로 가기
            </LinkButton>
          )}
        </div>
      </div>
    </li>
  );
};

export default BookmarkTab;
