'use client';
import { getOpenAIResponse } from '@/features/ai-interview/api/client-services';

type Params = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Params) => {
  const id = params.id;
  const handleOnclick = async () => {
    await getOpenAIResponse();
  };
  return (
    <div>
      <button onClick={handleOnclick}>TEST</button>
    </div>
  );
};

export default page;
