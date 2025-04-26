import clsx from 'clsx';
import { useState } from 'react';
import ImprovementIcon from '@/components/icons/improvement-icon';
import StrengthIcon from '@/components/icons/strength-icon';
import Typography from '@/components/ui/typography';

type Props = {
  feedback: FeedbackItem[];
};

export type FeedbackItem = {
  [key: string]: {
    strength: string;
    improvement: string;
  };
};

const FEEDBACK_KEYS: { [key: string]: string } = {
  proactivity: '자기주도성',
  communication: '커뮤니케이션',
  problemSolving: '문제 해결',
  growthPotential: '성장 가능성',
  interestInTheRole: '직무 관심도',
};

const STRENGTH_LABEL = '강점 분석';
const IMPROVEMENT_LABEL = '단점 분석';

const InterviewDetailFeedback = ({ feedback }: Props) => {
  const [activeTab, setActiveTab] = useState<string>('proactivity');

  return (
    <div className='h-full'>
      <div className='flex h-[calc(100%-4rem)] flex-col gap-4'>
        <div id='feedback-standards' className='flex flex-wrap gap-2 px-4'>
          {Object.keys(FEEDBACK_KEYS).map((key) => (
            <div key={key}>
              <button
                onClick={() => setActiveTab(key)}
                className={clsx(
                  'rounded-[50px] px-5 py-1',
                  activeTab === key ? 'bg-primary-orange-600' : 'border border-primary-orange-600'
                )}
              >
                <Typography size='xs' weight='bold' color={activeTab === key ? 'white' : 'primary-600'}>
                  {FEEDBACK_KEYS[key]}
                </Typography>
              </button>
            </div>
          ))}
        </div>

        {feedback.map((item) => {
          const [key, value] = Object.entries(item)[0];
          // section을 감싸고 있는 div의 74px+1rem은 상단 뱃지를 감싸고 있는 div의 크기가 바뀌면 74px이 아니게됨 상단 div가 두 줄이 되지 않도록 유의 ( -> 민철님한테 전달해둔 상황)
          return (
            key === activeTab && (
              <div key={key} className={`flex h-[calc(100%-(74px+1rem))] flex-col gap-4`}>
                <section className='flex max-h-[50%] items-center gap-4 rounded-lg border border-gray-200 p-4'>
                  <div className='max-w-[94px]'>
                    <StrengthIcon />
                  </div>
                  <div className='h-full'>
                    <Typography size='xl' weight='bold'>
                      {STRENGTH_LABEL}
                    </Typography>
                    <p className='h-[calc(100%-28px)] overflow-scroll text-cool-gray-700 scrollbar-hide'>
                      {value.strength}
                    </p>
                  </div>
                </section>
                <section className='flex max-h-[50%] items-center gap-4 rounded-lg border border-gray-200 p-4'>
                  <div className='max-w-[94px]'>
                    <ImprovementIcon />
                  </div>
                  <div className='h-full'>
                    <Typography size='xl' weight='bold'>
                      {IMPROVEMENT_LABEL}
                    </Typography>

                    <p className='h-[calc(100%-28px)] overflow-scroll text-cool-gray-700 scrollbar-hide'>
                      {value.improvement}
                    </p>
                  </div>
                </section>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default InterviewDetailFeedback;
