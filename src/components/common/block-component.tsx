import clsx from 'clsx';
import Typography from '@/components/ui/typography';
import Button from '@/components/ui/button';

type Props = {
  className: string;
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  buttonName: string;
  href: string;
};

const defaultClassName = 'w-full flex flex-col justify-center items-center gap-4';

const BlockComponent = (props: Props) => {
  const { className, firstLine, secondLine, thirdLine, buttonName, href } = props;
  return (
    <section className={clsx(className, defaultClassName)}>
      <div>
        <Typography as='h3' color='primary-600' weight='bold'>
          {firstLine}
        </Typography>
        <Typography as='h2' size='2xl' weight='bold'>
          {secondLine}
        </Typography>
        <Typography size='sm'>{thirdLine}</Typography>
      </div>
      <Button link href={href}>
        <Typography weight='bold'>{buttonName}</Typography>
      </Button>
    </section>
  );
};

export default BlockComponent;
