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
import Pressure from '@/lottie/pressure.json';
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
    <section className='flex w-full justify-center gap-5 mobile:flex-col tablet:flex-wrap'>
      {/* desktop & tablet - 이전 w-88 h-72*/}
      <section className='flex items-center justify-center gap-5 self-stretch mobile:hidden tablet:h-full tablet:w-full'>
        <div
          onClick={() => setInterviewType(CALM)}
          className={`tablet:w-84 aspect-[6/4] cursor-pointer overflow-hidden rounded-lg border desktop:max-w-[40rem] ${interviewType === CALM ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === CALM} animationData={Sunset} />
        </div>
        <div
          onClick={() => setInterviewType(PRESSURE)}
          className={`tablet:w-84 aspect-[6/4] cursor-pointer overflow-hidden rounded-lg border desktop:max-w-[40rem] ${interviewType === PRESSURE ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === PRESSURE} animationData={Pressure} />
        </div>
        <div className='hidden aspect-[6/4] w-[20rem] min-w-36 flex-col items-center justify-center self-stretch overflow-hidden rounded-lg border border-cool-gray-200 bg-cool-gray-10 desktop:flex'>
          <div className='mb-2'>
            <Typography as='h3' weight='bold' size='3xl' align='center'>
              실전 면접 준비!
            </Typography>
          </div>
          <div className='mb-2'>
            <Typography color='gray-300' align='center'>
              원하는 면접관과
            </Typography>
            <Typography color='gray-300' align='center'>
              작성한 자소서를 선택한 뒤,
            </Typography>
            <Typography color='gray-300' align='center'>
              면접을 시작하세요!
            </Typography>
          </div>
          {resumeId && (
            <Button onClick={handleClickSetInterviewType} fontWeight='bold'>
              면접 시작하기
            </Button>
          )}
        </div>
      </section>
      <section className='hidden h-48 w-full min-w-36 flex-col items-center justify-center overflow-hidden rounded-lg border border-cool-gray-200 bg-cool-gray-10 tablet:flex'>
        <div className='mb-4'>
          <div className='mb-2'>
            <Typography as='h3' weight='bold' size='3xl' align='center'>
              실전 면접 준비!
            </Typography>
          </div>
          <Typography color='gray-300' align='center'>
            원하는 면접관과
          </Typography>
          <Typography color='gray-300' align='center'>
            작성한 자소서를 선택한 뒤,
          </Typography>
          <Typography color='gray-300' align='center'>
            면접을 시작하세요!
          </Typography>
        </div>
        {resumeId && (
          <Button onClick={handleClickSetInterviewType} fontWeight='bold'>
            면접 시작하기
          </Button>
        )}
      </section>
      {/* mobile */}
      <section className='hidden w-full flex-wrap items-center justify-center gap-5 mobile:flex'>
        <div
          onClick={() => setInterviewType(CALM)}
          className={`w-54 h-36 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border ${interviewType === CALM ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === CALM} animationData={Sunset} />
        </div>
        <div
          onClick={() => setInterviewType(PRESSURE)}
          className={`w-54 h-36 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border ${interviewType === PRESSURE ? activeClass : deActiveClass}`}
        >
          <LottieAnimation active={interviewType === PRESSURE} animationData={Pressure} />
        </div>
      </section>
      <section className='hidden w-full flex-col items-center justify-center gap-2 mobile:flex'>
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
      </section>
    </section>
  );
};

export default SelectInterviewerBox;
