import Typography from '@/components/ui/typography';
import JobPostingSection from '@/features/job/job-posting-section';
import SaraminButton from '@/features/job/saramin-button';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const JobPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <article className='flex h-full flex-col'>
      <div className='mb-4 flex justify-between'>
        <div className='mobile:w-full'>
          <Typography
            as='h2'
            className='text-3xl font-bold text-primary-orange-600 mobile:hidden mobile:text-xl tablet:text-2xl'
          >
            맞춤형
            <span className='text-cool-gray-900'> 채용공고</span>
          </Typography>
          <Typography as='h3' className='text-xl text-cool-gray-500 mobile:text-center mobile:text-base'>
            프로필에 작성된 정보를 통해
            <span className='mobile:block'>
              <strong className='mobile:text-primary-orange-600'>맞춤형 채용공고</strong>를 추천해드립니다
            </span>
          </Typography>
        </div>

        <div className='hidden desktop:block'>
          <SaraminButton />
        </div>
      </div>

      <JobPostingSection session={session} />
    </article>
  );
};

export default JobPage;
