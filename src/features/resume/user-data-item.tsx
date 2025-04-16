import Typography from '@/components/ui/typography';

type Props = {
  userData: {
    label: string;
    content: string;
  };
};

const UserDataItem = ({ userData }: Props) => {
  const { label, content } = userData;

  return (
    <div className='flex gap-5'>
      <div className='shrink-0'>
        <Typography color='secondary-amber' size='xl' weight='bold'>
          {label}
        </Typography>
      </div>
      <div className='w-full'>
        <Typography weight='bold'>{content}</Typography>
        <Typography color='gray-500' weight='normal'>
          어디어디 기업..?
        </Typography>
      </div>
    </div>
  );
};

export default UserDataItem;
