import ListByTab from '@/features/my-page/list-by-tab';
import TabButtons from '@/features/my-page/tab-buttons';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const TabsField = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const result = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      _count: {
        select: {
          resumes: true,
          interviewHistorys: true,
          userSelectedJobs: true,
        },
      },
    },
  });

  const tabCounts = result?._count ?? {
    resumes: 0,
    interviewHistorys: 0,
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
