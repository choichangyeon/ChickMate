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
  const { id, title, createdAt } = resume;

  return (
    <li key={resume.id} className='flex flex-col'>
      <div className='flex justify-between'>
        <Typography color='gray-500'>{formatDate({ input: createdAt })}</Typography>
        <button aria-label={`${title} 임시저장 자소서 삭제`} onClick={() => onDeleteClick(id)}>
          <Trash />
        </button>
      </div>
      <button
        aria-label={`${title} 임시저장 자소서 불러오기`}
        onClick={() => onDraftResumeClick(resume)}
        className='w-fit font-bold text-cool-gray-900'
      >
        {title}
      </button>
    </li>
  );
};

export default DraftResumeItem;
