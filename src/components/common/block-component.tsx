import clsx from 'clsx';
import Typography from '@/components/ui/typography';

type Props = {
  className: string;
  firstLine: string;
  secondLine: string;
  thirdLine: string;
};

const defaultClassName = 'w-full flex flex-col justify-center items-center gap-4';

const BlockComponent = (props: Props) => {
  const { className, firstLine, secondLine, thirdLine } = props;
  return (
    <section className={clsx(className, defaultClassName)}>
      <div>
        <Typography as='h3' color='primary-600' weight='bold'>
          {firstLine}
        </Typography>
        <Typography as='h2'>{secondLine}</Typography>
        <Typography>{thirdLine}</Typography>
      </div>
    </section>
  );
};

export default BlockComponent;
