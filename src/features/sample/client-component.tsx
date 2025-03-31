'use client';
import useSampleStore from '@/store/sample-store';
import { useGetSampleQuery } from './hooks/use-sample-query';
import { usePostSampleMutation } from './hooks/use-sample-mutation';

type Props = {
  id: string;
};

const ClientComponent = ({ id }: Props) => {
  const { sample } = useSampleStore();

  const { data, isError, isPending } = useGetSampleQuery(id);

  const { mutate: postSampleMutation } = usePostSampleMutation();

  console.log(data);

  if (isError) return <div>Error...</div>;

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <div>{data?.title}</div>
      <button onClick={() => postSampleMutation('제발...')}>post</button>
    </div>
  );
};

export default ClientComponent;
