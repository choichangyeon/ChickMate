import Trash from '@/components/icons/trash';
import Typography from '@/components/ui/typography';
import { formatDate } from '@/utils/format-date';
import type { Resume } from '@prisma/client';

type Props = {
  resume: Resume;
  onDeleteClick: (resumeId: number) => void;
  onDraftResumeClick: (resume: Resume) => void;
};

const DraftResumeItem = ({ resume, onDeleteClick, onDraftResumeClick }: Props) => {
  return (
    <li key={resume.id} className='flex flex-col'>
      <div className='flex justify-between'>
        <Typography color='gray-500'>{formatDate({ input: resume.createdAt })}</Typography>
        <button aria-label={`${resume.title} 임시저장 자소서 삭제`} onClick={() => onDeleteClick(resume.id)}>
          <Trash />
        </button>
      </div>
      <button
        aria-label={`${resume.title} 임시저장 자소서 불러오기`}
        onClick={() => onDraftResumeClick(resume)}
        className='w-fit font-bold text-cool-gray-900'
      >
        {resume.title}
      </button>
    </li>
  );
};

export default DraftResumeItem;
