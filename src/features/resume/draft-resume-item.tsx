import Trash from '@/components/icons/trash';
import Typography from '@/components/ui/typography';
import { formatDate } from '@/utils/format-date';
import { Resume } from '@prisma/client';

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
        <button onClick={() => onDeleteClick(resume.id)}>
          <Trash />
        </button>
      </div>
      <button className='text-left font-bold text-cool-gray-900' onClick={() => onDraftResumeClick(resume)}>
        {resume.title}
      </button>
    </li>
  );
};

export default DraftResumeItem;
