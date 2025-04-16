'use client';

import clsx from 'clsx';
import { useInterviewStore } from '@/store/use-interview-store';

const QUESTION_STEP = 8;

const QuestionStep = () => {
  const questionIndex = useInterviewStore((state) => state.questionIndex);
  const steps = Array.from({ length: QUESTION_STEP }, (item, index) => index + 1);

  return (
    <div className='flex gap-2'>
      {steps.map((step) => {
        const isActive = questionIndex === step;

        return (
          <span
            key={step}
            className={clsx(
              'flex h-[24px] w-[40px] items-center justify-center rounded-full border border-primary-orange-700 px-[10px] text-sm font-bold',
              {
                'bg-primary-orange-600 text-white': isActive,
                'text-primary-orange-600': !isActive,
              }
            )}
          >
            Q{step}
          </span>
        );
      })}
    </div>
  );
};

export default QuestionStep;
