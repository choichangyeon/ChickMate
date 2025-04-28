'use client';

import Typography from '@/components/ui/typography';
import { useState } from 'react';
import { Session } from 'next-auth';
import ResumeAllModal from '@/features/interview/resume-all-modal';

type Props = {
  session: Session | null;
};

const ResumeAllButton = ({ session }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  if (!session) return null;

  return (
    <div className='cursor-pointer' onClick={() => setOpenModal(true)}>
      <Typography color='gray-500'>전체보기</Typography>
      {openModal && <ResumeAllModal />}
    </div>
  );
};

export default ResumeAllButton;
