import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { AUTO_SAVE_STATUS } from '@/constants/resume-constants';
import type { ResumeType } from '@/types/DTO/resume-dto';

type Props = {
  resume?: ResumeType;
  draftResumeList?: ResumeType[];
  autoSaveStatus: string;
  onClick: () => void;
};

const { SAVED } = AUTO_SAVE_STATUS;

const ResumeFormActionButton = ({ resume, draftResumeList, autoSaveStatus, onClick }: Props) => {
  return (
    <div className='mb-8 flex justify-between mobile:flex-col mobile:gap-2'>
      {resume ? (
        <Button size='fixed' type='submit'>
          수정 완료
        </Button>
      ) : (
        <div className='flex gap-8 mobile:flex-col mobile:gap-1'>
          <Button size='fixed' type='button' onClick={onClick}>
            <span className='mobile:text-sm'>임시 저장된 글 | {draftResumeList?.length ?? 0}</span>
          </Button>
          <Button size='fixed' type='submit'>
            <span className='mobile:text-sm'>저장하기</span>
          </Button>
        </div>
      )}
      <Typography color={autoSaveStatus === SAVED ? 'primary-600' : 'gray-500'}>{autoSaveStatus}</Typography>
    </div>
  );
};

export default ResumeFormActionButton;
