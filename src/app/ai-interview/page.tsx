import ClientComponent from '@/features/ai-interview/client-component';

type Params = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Params) => {
  const id = params.id;

  return <ClientComponent />;
};

export default page;
