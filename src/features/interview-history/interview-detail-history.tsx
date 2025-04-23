import Image from 'next/image';
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
  return (
    <section className='relative flex-1 overflow-hidden'>
      <div className='pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-10 bg-gradient-to-t from-white to-transparent' />

      <ol className='flex h-full flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide'>
        {history.map((interviewQna, idx) => (
          <li key={idx}>
            <div className='flex gap-4'>
              <div>
                {/* 면접관 원형 이미지 추가 시 calm, pressure에 따른 이미지 변경 */}
                <Image src='/assets/character/header/poly-level6.png' width={48} height={48} alt='interviewer-img' />
              </div>
              <div>
                <Typography weight='bold' color='primary-600'>
                  {data.interviewType}
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
              <Typography color='secondary-amber' align='right'>
                내 답변
              </Typography>
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
