import { prisma } from '@/lib/prisma';
import type { User } from '@prisma/client';
import ListByTab from '@/features/my-page/list-by-tab';
import TabButtons from '@/features/my-page/tab-buttons';
import { INIT_TAB_COUNTS } from '@/constants/my-page-constants';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';
import { RESUME_STATUS } from '@/constants/resume-constants';

const { COMPLETED } = INTERVIEW_HISTORY_STATUS;
const { SUBMIT } = RESUME_STATUS;
type Props = {
  userId: User['id'];
};
const TabsField = async ({ userId }: Props) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      _count: {
        select: {
          resumes: {
            where: {
              status: SUBMIT,
            },
          },
          interviewHistories: {
            where: {
              status: COMPLETED,
            },
          },
          userSelectedJobs: true,
        },
      },
    },
  });

  const initialTabCounts = result?._count ?? INIT_TAB_COUNTS;

  return (
    <section className='h-[80dvh] max-h-[643px] w-1/2 max-w-[634px] overflow-hidden rounded-t-[8px] border bg-cool-gray-10'>
      <TabButtons userId={userId} initialTabCounts={initialTabCounts} />
      <div className='h-full max-h-[595px] p-8'>
        <ListByTab />
      </div>
    </section>
  );
};

export default TabsField;
