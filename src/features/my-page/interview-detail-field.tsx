import Typography from '@/components/ui/typography';
import { InterviewHistory } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = {
  id: string;
};

type FeedbackItem = {
  [key: string]: {
    strength: string;
    improvement: string;
  };
};

const InterviewDetailField = ({ id }: Props) => {

  // 추후 use hook 분리 및 상수 처리 예정
  const { data, isPending, isError } = useQuery({
    queryKey: ['interview', id],
    queryFn: async () => {
      const res = await fetch(`/api/ai/interview/${id}`);
      const { response }: { response: InterviewHistory } = await res.json();
      return response;
    },
    enabled: !!id,
  });
  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러임..</div>;

  let feedbackArray: FeedbackItem[] = [];

  if (typeof data.feedback === 'string') {
    feedbackArray = JSON.parse(data.feedback);
  }

  return (
    <div>
      <div>
        <Typography>면접 결과</Typography>
        {feedbackArray.map((item) => {
          const [key, value] = Object.entries(item)[0];

          return (
            <div key={key} style={{ marginTop: '16px' }}>
              <Typography>{key}</Typography>
              <Typography>장점: {value.strength}</Typography>
              <Typography>개선점: {value.improvement}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewDetailField;
