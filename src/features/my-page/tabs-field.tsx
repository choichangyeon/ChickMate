import { prisma } from '@/lib/prisma';
import ListByTab from '@/features/my-page/list-by-tab';
import TabButtons from '@/features/my-page/tab-buttons';

import type { User } from '@prisma/client';
type Props = {
  userId: User['id'];
};
const TabsField = async ({ userId }: Props) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      _count: {
        select: {
          resumes: true,
          interviewHistories: true,
          userSelectedJobs: true,
        },
      },
    },
  });

  const tabCounts = result?._count ?? {
    resumes: 0,
    interviewHistories: 0,
    userSelectedJobs: 0,
  };

  return (
    <section className='h-[80dvh] w-1/2 rounded-t-xl border'>
      <TabButtons tabCounts={tabCounts} />
      <div className='p-8'>
        <ListByTab />
      </div>
    </section>
  );
};

export default TabsField;
