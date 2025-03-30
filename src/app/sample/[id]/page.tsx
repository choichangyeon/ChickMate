import ClientComponent from '@/components/sample/sample-client-component';

type Params = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Params) => {
  const id = params.id;
  return (
    <div>
      <ClientComponent id={id} />
    </div>
  );
};

export default page;
