import { prisma } from '@/lib/prisma';
import type { User } from '@prisma/client';
import ListByTab from '@/features/my-page/list-by-tab';
import TabButtons from '@/features/my-page/tab-buttons';
import { INIT_TAB_COUNTS, TABS } from '@/constants/my-page-constants';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';
import { RESUME_STATUS } from '@/constants/resume-constants';

const { COMPLETED } = INTERVIEW_HISTORY_STATUS;
const { SUBMIT } = RESUME_STATUS;
const { INTERVIEW_HISTORY_TAB, BOOKMARK_TAB, RESUME_TAB } = TABS;
type Props = {
  userId: User['id'];
};
const TabsField = async ({ userId }: Props) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      _count: {
        select: {
          [RESUME_TAB]: {
            where: {
              status: SUBMIT,
            },
          },
          [INTERVIEW_HISTORY_TAB]: {
            where: {
              status: COMPLETED,
            },
          },
          [BOOKMARK_TAB]: true,
        },
      },
    },
  });

  const initialTabCounts = result?._count ?? INIT_TAB_COUNTS;

  return (
    <section className='h-full w-full overflow-hidden rounded-t-[8px] border desktop:w-1/2 desktop:min-w-[440px] desktop:max-w-[634px]'>
      <TabButtons userId={userId} initialTabCounts={initialTabCounts} />
      <div className='h-full p-8'>
        <ListByTab />
      </div>
    </section>
  );
};

export default TabsField;
