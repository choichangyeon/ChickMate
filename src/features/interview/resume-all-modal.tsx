'use client';

import Modal from '@/components/ui/modal';
import { useEffect } from 'react';
import { MODAL_ID } from '@/constants/modal-id-constants';
import Typography from '@/components/ui/typography';
import { useSubmitResumesQuery } from '@/hooks/queries/use-submit-resumes-query';
import useResumeStore from '@/features/interview/hooks/use-resume-store';

const ResumeAllModal = () => {
  const { data: resumeList, isPending, isError } = useSubmitResumesQuery();
  const { resumeId: selectedId, setResume } = useResumeStore();

  useEffect(() => {
    if (selectedId === null && isPending === false) {
      if (resumeList && resumeList.length > 0) {
        setResume(resumeList[0].id);
      }
    }
  }, [resumeList]);

  if (isPending || isError || !resumeList || resumeList.length === 0) {
    return null;
  }
  return (
    <Modal modalId={MODAL_ID.COMPLETED_RESUME}>
      <section className='flex flex-col items-center justify-center'>
        <Typography size='2xl' weight='bold'>
          내 자소서 리스트
        </Typography>
        <Typography weight='bold' color='primary-600'>
          면접 볼 자소서를 선택하세요!
        </Typography>
      </section>
      <section></section>
    </Modal>
  );
};

export default ResumeAllModal;
