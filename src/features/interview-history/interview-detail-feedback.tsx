import ImprovementIcon from '@/components/icons/improvement-icon';
import StrengthIcon from '@/components/icons/strength-icon';
import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import React, { useState } from 'react';

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
    <div>
      <div className='flex flex-col gap-4'>
        <div className='ml-4 flex flex-wrap gap-2'>
          {Object.keys(FEEDBACK_KEYS).map((key) => (
            <div key={key} className='min-w-[84px]'>
              <Button
                onClick={() => setActiveTab(key)}
                variant={activeTab === key ? 'contained' : 'outline'}
                size='small'
              >
                <Typography size='xs' weight='bold' color={activeTab === key ? 'white' : 'primary-600'}>
                  {FEEDBACK_KEYS[key]}
                </Typography>
              </Button>
            </div>
          ))}
        </div>

        {feedback.map((item) => {
          const [key, value] = Object.entries(item)[0];
          return (
            key === activeTab && (
              <div key={key} className='flex flex-col gap-4'>
                <div className='flex items-center gap-4 rounded-lg border border-gray-200 p-4'>
                  <div className='min-w-[94px]'>
                    <StrengthIcon />
                  </div>
                  <div>
                    <Typography size='xl' weight='bold'>
                      {STRENGTH_LABEL}
                    </Typography>
                    <Typography weight='normal' color='gray-700'>
                      {value.strength}
                    </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-4 rounded-lg border border-gray-200 p-4'>
                  <div className='min-w-[94px]'>
                    <ImprovementIcon />
                  </div>
                  <div>
                    <Typography size='xl' weight='bold'>
                      {IMPROVEMENT_LABEL}
                    </Typography>
                    <Typography weight='normal' color='gray-700'>
                      {value.improvement}
                    </Typography>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default InterviewDetailFeedback;
