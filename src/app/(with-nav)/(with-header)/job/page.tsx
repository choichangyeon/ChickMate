import LinkButton from '@/components/ui/link-button';
import Typography from '@/components/ui/typography';
import JobPostingSection from '@/features/job/job-posting-section';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const SARAMIN_URL = 'http://www.saramin.co.kr';

const JobPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='flex h-full flex-col'>
      <section className='mb-4'>
        <Typography color='primary-600' as='h1' size='3xl' weight='bold'>
          맞춤형
          <span className='text-cool-gray-900'> 채용공고</span>
        </Typography>
        <Typography color='gray-500' size='xl'>
          프로필에 작성된 정보를 통해 맞춤형 채용공고를 추천해드립니다
        </Typography>
      </section>
      <div className='text-right'>
        <LinkButton href={SARAMIN_URL} target='_blank'>
          데이터 출처: 취업 사람인
        </LinkButton>
      </div>

      <JobPostingSection session={session} />
    </div>
  );
};

export default JobPage;
