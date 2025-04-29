'use client';

import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { INTERVIEW_TYPE } from '@/constants/interview-constants';
import { PATH } from '@/constants/path-constant';
import { postInterview } from '@/features/interview/api/client-services';
import useResumeStore from '@/features/interview/hooks/use-resume-store';
import { useInterviewStore } from '@/store/use-interview-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Sunset from '@/lottie/sunset.json';
import Sunset2 from '@/lottie/sunset_2.json';
import Pressure from '@/lottie/pressure.json';
import Pressure2 from '@/lottie/pressure_2.json';
import LottieAnimation from '@/components/common/lottie-animation';
import { Session } from 'next-auth';
import { Notify } from 'notiflix';
import { AUTH_MESSAGE } from '@/constants/message-constants';

const { CALM, PRESSURE } = INTERVIEW_TYPE;
const {
  ERROR: { SESSION_NO_USER },
} = AUTH_MESSAGE;
const { LIVE } = PATH.INTERVIEW;

const activeClass = 'border-primary-orange-600 bg-cool-gray-10 border-2 shadow-lg shadow-primary-orange-600/20';
const deActiveClass = 'border-cool-gray-300';

type Props = {
  session: Session | null;
};

const SelectInterviewerBox = ({ session }: Props) => {
  const [interviewType, setInterviewType] = useState<string>(CALM);
  const router = useRouter();
  const { resumeId } = useResumeStore();
  const resetQuestionIndex = useInterviewStore((state) => state.resetQuestionIndex);

  const handleClickSetInterviewType = async () => {
    if (!session) {
      Notify.warning(SESSION_NO_USER);
      return;
    }
    if (resumeId) {
      try {
        const interviewId = await postInterview({ resumeId, interviewType });
        resetQuestionIndex();
        // 동적 라우팅 페이지 라우팅
        router.push(`${LIVE(interviewId)}`);
      } catch (error) {
        Notify.failure((error as Error).message);
      }
    }
  };
  return (
    <section className='flex w-full flex-wrap gap-5 mobile:flex-col'>
      {/* desktop & tablet - 이전 w-88 h-72*/}
      <aside className='flex h-80 items-start justify-start gap-5 mobile:hidden tablet:h-52 tablet:w-full'>
        <div
          onClick={() => setInterviewType(CALM)}
          className={`w-76 h-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border tablet:h-48 tablet:w-72 ${interviewType === CALM ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === CALM} animationData={Sunset2} />
        </div>
        <div
          onClick={() => setInterviewType(PRESSURE)}
          className={`w-76 h-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border tablet:h-48 tablet:w-72 ${interviewType === PRESSURE ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === PRESSURE} animationData={Pressure2} />
        </div>
      </aside>
      <aside className='flex h-80 w-80 min-w-36 flex-col items-center justify-center overflow-hidden rounded-lg border border-secondary-amber bg-cool-gray-10 mobile:hidden tablet:h-52 tablet:w-[600px]'>
        <div className='mb-4'>
          {/* TODO: 이 부분은 면접관을 설명하는 부분, 추후 수정 가능 */}
          {interviewType === 'calm' ? (
            <>
              <div className='mb-2'>
                <Typography as='h3' weight='bold' size='3xl' align='center'>
                  햇살 면접관
                </Typography>
              </div>
              <Typography color='gray-300' align='center'>
                이 면접관은 침착하고 편안한 느낌으로
              </Typography>
              <Typography color='gray-300' align='center'>
                면접자를 평가합니다.
              </Typography>
            </>
          ) : (
            <>
              <div className='mb-2'>
                <Typography as='h3' size='3xl' weight='bold' align='center'>
                  불타는 면접관
                </Typography>
              </div>
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
      {/* mobile */}
      <aside className='hidden w-full flex-wrap items-center justify-center gap-5 mobile:flex'>
        <div
          onClick={() => setInterviewType(CALM)}
          className={`h-36 w-52 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border ${interviewType === CALM ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === CALM} animationData={Sunset2} />
        </div>
        <div
          onClick={() => setInterviewType(PRESSURE)}
          className={`h-36 w-52 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border ${interviewType === PRESSURE ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === PRESSURE} animationData={Pressure2} />
        </div>
      </aside>
      <aside className='hidden w-full flex-col items-center justify-center gap-2 mobile:flex'>
        <div className='flex flex-row'>
          <Typography weight='black' color='primary-600'>
            Chick Mate&nbsp;
          </Typography>
          {interviewType === 'calm' ? (
            <Typography weight='bold'>햇살 면접관</Typography>
          ) : (
            <Typography weight='bold'>불타는 면접관</Typography>
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
