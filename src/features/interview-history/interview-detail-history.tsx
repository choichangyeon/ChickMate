import Image from 'next/image';
import { useRef } from 'react';
import { useInterSectionObserverHook } from '@/features/interview-history/hook/use-intersection-observer-hook';
import { getInterviewerName } from '@/features/interview-history/utils/get-interviewer-name';
import Typography from '@/components/ui/typography';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
import type { ResumeType } from '@/types/DTO/resume-dto';

type Props = {
  data: InterviewHistoryType & {
    InterviewQnAList: InterviewQnAType[];
    resume: ResumeType;
  };
};

const InterviewDetailHistory = ({ data }: Props) => {
  const history = data.InterviewQnAList;
  const lastItemRef = useRef<HTMLLIElement | null>(null);
  const { isVisible } = useInterSectionObserverHook(lastItemRef);

  return (
    <section className='relative flex-1 overflow-hidden'>
      {!isVisible && (
        <div className='pointer-events-none absolute bottom-0 left-0 right-0 z-overlay h-10 bg-gradient-to-t from-white to-transparent' />
      )}
      <ol className='flex h-full flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide'>
        {history.map((interviewQna, idx) => (
          <li key={idx} ref={history.length === idx + 1 ? lastItemRef : null}>
            <div className='flex gap-4'>
              <div>
                <Image
                  src={`/assets/character/interviewer/poly-interviewer-icon-${data.interviewType}.png`}
                  width={48}
                  height={48}
                  alt={`interviewer-${data.interviewType}-image`}
                />
              </div>
              <div>
                <Typography weight='bold' color='primary-600'>
                  {getInterviewerName(data.interviewType)}
                </Typography>
                <Typography size='sm' weight='normal' color='gray-500'>
                  {data.resume.title}
                </Typography>
              </div>
            </div>
            <div className='px-16 py-2'>
              <Typography weight='normal' color='gray-700'>
                {interviewQna.question}
              </Typography>
            </div>
            <div>
              <span className='block text-right text-secondary-amber'>내 답변</span>
              <div className='py-2'>
                <Typography weight='normal' color='gray-700' align='right'>
                  {interviewQna.answer}
                </Typography>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default InterviewDetailHistory;
