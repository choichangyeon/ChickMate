'use client';

import LoadingAnimation from '@/components/common/loading-animation';
import ErrorComponent from '@/components/common/error-component';
import LeftArrowIcon from '@/components/icons/left-arrow-icon';
import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { TABS } from '@/constants/my-page-constants';
import { PATH } from '@/constants/path-constant';
import { QUERY_KEY } from '@/constants/query-key';
import { getMyPagePath } from '@/features/my-page/utils/get-my-page-path';
import { useResumeQuery } from '@/features/resume-list/hooks/use-resume-query';
import ResumeQnAItem from '@/features/resume-list/resume-qna-item';
import { useDeleteResumeMutation } from '@/features/resume/hooks/use-delete-resume-mutation';
import type { ResumeType } from '@/types/DTO/resume-dto';
import type { UserType } from '@/types/DTO/user-dto';
import type { Field } from '@/types/resume';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showNotiflixConfirm } from '@/utils/show-notiflix-confirm';
import { RESUME_MESSAGE } from '@/constants/message-constants';
import { Notify } from 'notiflix';
import { getErrorMessage } from '@/utils/get-error-message';
import { useQueryClient } from '@tanstack/react-query';

const { DETAIL } = PATH.RESUME;
const { RESUMES } = QUERY_KEY;
const { RESUME_TAB } = TABS;
type Props = {
  resumeId: ResumeType['id'];
  userId: UserType['id'];
};
const {
  CONFIRM: { DELETE },
  DELETE_REQUEST_SUCCESS,
} = RESUME_MESSAGE;
const ResumeDetailField = ({ resumeId, userId }: Props) => {
  const { data: resume, isPending, isError } = useResumeQuery(resumeId);
  const { mutateAsync: deleteResumeMutate } = useDeleteResumeMutation(RESUMES, userId);
  const router = useRouter();
  const queryClient = useQueryClient();

  if (isPending)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <LoadingAnimation />
      </div>
    );
  if (isError)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <ErrorComponent />
      </div>
    );

  const resumeContent = resume.content as Field[];

  const confirmDelete = () => {
    showNotiflixConfirm({
      message: DELETE,
      okFunction: handleDeleteResume,
    });
  };

  const handleDeleteResume = async () => {
    try {
      await deleteResumeMutate(resumeId);
      queryClient.invalidateQueries({ queryKey: [RESUMES] });
      Notify.success(DELETE_REQUEST_SUCCESS);
    } catch (error) {
      Notify.failure(getErrorMessage(error));
    }
  };

  const handlePatchResume = () => {
    router.push(DETAIL(resumeId));
    router.refresh();
  };

  return (
    <section className='flex h-[80dvh] flex-col gap-8'>
      <div className='flex items-center gap-4'>
        <Link href={getMyPagePath(RESUME_TAB)}>
          <LeftArrowIcon />
        </Link>
        <div>
          <Typography size='3xl' weight='bold'>
            내 자소서
          </Typography>
          <Typography size='xl' color='gray-500' weight='normal'>
            {resume.title}
          </Typography>
        </div>
      </div>
      <ul className='flex h-[70dvh] flex-col gap-4 overflow-y-auto scrollbar-hide'>
        {resumeContent.map((content, idx) => {
          return <ResumeQnAItem key={content.id} content={content} idx={idx} />;
        })}
      </ul>
      <div className='flex gap-8'>
        <Button size='fixed' onClick={handlePatchResume}>
          수정하기
        </Button>
        <Button size='fixed' onClick={confirmDelete}>
          삭제하기
        </Button>
      </div>
    </section>
  );
};

export default ResumeDetailField;
