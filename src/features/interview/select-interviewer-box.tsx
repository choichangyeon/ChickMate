'use client';

import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { INTERVIEW_TYPE } from '@/constants/interview-constants';
import { PATH } from '@/constants/path-constant';
import { postInterview } from '@/features/interview/api/client-services';
import useResumeStore from '@/features/interview/hooks/use-resume-store';
import { useInterviewStore } from '@/store/use-interview-store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import SunsetAnimation from '../../components/common/sunset-animation';

const { CALM, PRESSURE } = INTERVIEW_TYPE;
const { LIVE } = PATH.INTERVIEW;

const activeBgClass = 'outline-primary-orange-600 bg-cool-gray-10';

const SelectInterviewerBox = () => {
  const [interviewType, setInterviewType] = useState<string>(CALM);
  const router = useRouter();
  const { resumeId } = useResumeStore();
  const resetQuestionIndex = useInterviewStore((state) => state.resetQuestionIndex);
  const charterType = 'poly';
  const imageBasePath = `/assets/character/interviewer/${charterType}-interviewer`;

  const handleClickSetInterviewType = async () => {
    if (resumeId) {
      const interviewId = await postInterview({ resumeId, interviewType });
      resetQuestionIndex();
      // 동적 라우팅 페이지 라우팅
      router.push(`${LIVE(interviewId)}`);
    }
  };

  return (
    <section className='flex flex-row'>
      <aside className='mr-5 flex w-full items-start justify-start gap-5 self-stretch'>
        <div
          onClick={() => setInterviewType(CALM)}
          className={`flex w-full cursor-pointer items-center justify-center self-stretch rounded-lg outline outline-1 outline-cool-gray-300 ${interviewType === CALM ? activeBgClass : ''}`}
        >
          <SunsetAnimation />
        </div>
        <div
          onClick={() => setInterviewType(PRESSURE)}
          className={`flex w-full cursor-pointer items-center justify-center self-stretch rounded-lg outline outline-1 outline-cool-gray-300 ${interviewType === PRESSURE ? activeBgClass : ''}`}
        >
          <Image src={`${imageBasePath}-pressure.png`} alt='불타는 면접관' width={220} height={220} />
        </div>
      </aside>
      <aside className='flex h-80 w-96 flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-emerald-900/0 outline outline-1 outline-offset-[-1px] outline-yellow-500'>
        <div className='mb-4'>
          {/* TODO: 이 부분은 면접관을 설명하는 부분, 추후 수정 가능 */}
          {interviewType === 'calm' ? (
            <>
              <Typography as='h3' size='3xl' weight='bold' align='center' className='mb-2'>
                햇살 면접관
              </Typography>
              <Typography color='gray-300' align='center'>
                이 면접관은 침착하고 편안한 느낌으로
              </Typography>
              <Typography color='gray-300' align='center'>
                면접자를 평가합니다.
              </Typography>
            </>
          ) : (
            <>
              <Typography as='h3' size='3xl' weight='bold' align='center' className='mb-2'>
                불타는 면접관
              </Typography>
              <Typography color='gray-300' align='center'>
                이 면접관은 냉철하고 비판적인 사고를
              </Typography>
              <Typography color='gray-300' align='center'>
                통해 면접자를 평가합니다.
              </Typography>
            </>
          )}
        </div>
        {resumeId && (
          <Button onClick={handleClickSetInterviewType} fontWeight='bold'>
            면접 시작하기
          </Button>
        )}
      </aside>
    </section>
  );
};

export default SelectInterviewerBox;

// {[CALM, PRESSURE].map((type) => (
//   <div
//     key={type}
//     onClick={() => setInterviewType(type)}
//     className={`relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg outline outline-1 outline-cool-gray-300 ${interviewType === type ? activeBgClass : ''} `}
//   >
//     {/* 이 div 만 움직입니다 */}
//     <div
//       className={`absolute inset-0 flex transform items-center justify-center transition-transform duration-300 ease-in-out ${
//         interviewType === type ? 'scale-125' : 'scale-100'
//       } `}
//     >
//       <Image
//         src={`${imageBasePath}-${type === CALM ? 'calm' : 'pressure'}.png`}
//         alt={type === CALM ? '햇살 면접관' : '불타는 면접관'}
//         width={220}
//         height={220}
//       />
//     </div>
//   </div>
// ))}
