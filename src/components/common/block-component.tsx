import clsx from 'clsx';
import Typography from '@/components/ui/typography';
import Button from '@/components/ui/button';

type Props = {
  className?: string;
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  buttonName: string;
  href?: string;
  onClick?: () => void;
};

const defaultClassName = 'w-full flex flex-col justify-center items-center gap-4';

const BlockComponent = (props: Props) => {
  const { className, firstLine, secondLine, thirdLine, buttonName, href, onClick } = props;
  return (
    <section className={clsx(className, defaultClassName)}>
      <div className='flex flex-col items-center justify-center'>
        <Typography color='primary-600' weight='bold'>
          {firstLine}
        </Typography>
        <Typography size='2xl' weight='bold'>
          {secondLine}
        </Typography>
        <Typography size='sm'>{thirdLine}</Typography>
      </div>
      {href ? (
        <Button variant='outline' color='dark' link href={href}>
          <Typography weight='bold'>{buttonName}</Typography>
        </Button>
      ) : (
        <Button variant='outline' color='dark' onClick={onClick}>
          <Typography weight='bold'>{buttonName}</Typography>
        </Button>
      )}
    </section>
  );
};

export default BlockComponent;
