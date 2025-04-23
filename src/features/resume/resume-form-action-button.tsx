import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Resume } from '@prisma/client';

type Props = {
  resume?: Resume;
  draftResumeList?: Resume[];
  autoSaveStatus: string;
  onClick: () => void;
};

const ResumeFormActionButton = ({ resume, draftResumeList, autoSaveStatus, onClick }: Props) => {
  return (
    <div className='mb-8 flex justify-between'>
      {resume ? (
        <Button variant='outline' color='dark' size='large' type='submit'>
          수정 완료
        </Button>
      ) : (
        <div className='flex gap-8'>
          <Button variant='outline' color='dark' size='large' type='button' onClick={onClick}>
            임시 저장된 글 | {draftResumeList?.length ?? 0}
          </Button>
          <Button variant='outline' color='dark' size='large' type='submit'>
            저장하기
          </Button>
        </div>
      )}
      <Typography color='gray-500'>{autoSaveStatus}</Typography>
    </div>
  );
};

export default ResumeFormActionButton;
