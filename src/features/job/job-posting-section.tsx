import { Session } from 'next-auth';
import JobPostingsBox from '@/features/job/job-postings-box';
import { JobPostingBlockComponent } from '@/features/job/job-posting-block-component';

type Props = {
  session: Session | null;
};

const JobPostingSection = async ({ session }: Props) => {
  if (!session) {
    return <JobPostingBlockComponent type='unauthenticated' />;
  }
  return (
    <section className='h-full text-right'>
      <JobPostingsBox userId={session.user.id} />
    </section>
  );
};

export default JobPostingSection;
