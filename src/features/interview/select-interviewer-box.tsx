'use client';

import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { INTERVIEW_TYPE } from '@/constants/interview-constants';
import Image from 'next/image';
import { useState } from 'react';
import useResumeStore from '@/features/interview/hooks/use-resume-store';

const { CALM, PRESSURE } = INTERVIEW_TYPE;

const SelectInterviewerBox = () => {
  const [interviewType, setInterviewType] = useState<string>(CALM);
  const { id } = useResumeStore();
  const handleClickSetInterviewType = () => {
    // TODO: 민조님 여기서 interview-live에서 필요한 정보를 보내는 로직을 구현해주세요
    // id는 자소서의 id입니다!
    console.log(id);
  };
  return (
    <div className='flex flex-row'>
      <div className='mr-5 flex w-full items-start justify-start gap-5 self-stretch'>
        <div
          onClick={() => setInterviewType(CALM)}
          className='flex w-full items-center justify-center self-stretch rounded-lg bg-primary-orange-600 outline outline-1 outline-cool-gray-300'
        >
          <Image src={`/assets/character/card/yellow-level2.png`} alt='침착한 면접관' width={220} height={220} />
        </div>
        <div
          onClick={() => setInterviewType(PRESSURE)}
          className='flex w-full items-center justify-center self-stretch rounded-lg bg-primary-orange-600 outline outline-1 outline-cool-gray-300'
        >
          <Image src={`/assets/character/card/yellow-level3.png`} alt='불타는 면접관' width={220} height={220} />
        </div>
      </div>
      <aside className='flex h-80 w-96 flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-emerald-900/0 outline outline-1 outline-offset-[-1px] outline-yellow-500'>
        <div className='mb-4'>
          {/* TODO: 이 부분은 면접관을 설명하는 부분, 추후 수정 가능 */}
          {interviewType === 'calm' ? (
            <>
              <Typography as='h3' size='3xl' weight='bold' align='center' className='mb-2'>
                침착한 면접관
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
        {/* TODO: 버튼 로직 구현 */}
        <Button color='secondary' variant='outline' link href='/interview-live'>
          <Typography weight='bold'>면접 시작하기</Typography>
        </Button>
      </aside>
    </div>
  );
};

export default SelectInterviewerBox;
