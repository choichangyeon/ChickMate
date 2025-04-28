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
import Sunset from '@/lottie/sunset.json';
import Pressure from '@/lottie/pressure.json';
import LottieAnimation from '@/components/common/lottie-animation';

const { CALM, PRESSURE } = INTERVIEW_TYPE;
const { LIVE } = PATH.INTERVIEW;

const activeClass = 'border-primary-orange-600 bg-cool-gray-10';
const deActiveClass = 'border-cool-gray-300';

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
    <section className='flex flex-wrap gap-5'>
      <aside className='flex h-80 items-start justify-start gap-5 self-stretch'>
        <div
          onClick={() => setInterviewType(CALM)}
          className={`w-100 h-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border ${interviewType === CALM ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === CALM} animationData={Sunset} />
        </div>
        <div
          onClick={() => setInterviewType(PRESSURE)}
          className={`w-100 h-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border ${interviewType === PRESSURE ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === PRESSURE} animationData={Pressure} speed={0.4} />
        </div>
      </aside>
      <aside className='flex h-80 w-96 min-w-36 flex-col items-center justify-center overflow-hidden rounded-lg bg-emerald-900/0 outline outline-1 outline-offset-[-1px] outline-yellow-500'>
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
