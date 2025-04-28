import clsx from 'clsx';
import Button from '@/components/ui/button';
import LinkButton from '@/components/ui/link-button';
import Typography from '@/components/ui/typography';

type Props = {
  className?: string;
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  buttonName?: string;
  href?: string;
  onClick?: () => void;
};

const defaultClassName = 'w-full flex flex-col justify-center items-center gap-4 h-full';

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
      {buttonName && <RenderComponent onClick={onClick} buttonName={buttonName} href={href} />}
    </section>
  );
};

export default BlockComponent;

type RenderComponentProps = {
  onClick?: Props['onClick'];
  buttonName?: Props['buttonName'];
  href?: Props['href'];
};
const RenderComponent = ({ onClick, buttonName, href }: RenderComponentProps) => {
  if (href)
    return (
      <LinkButton href={href} fontWeight='bold'>
        {buttonName}
      </LinkButton>
    );

  if (onClick)
    return (
      <Button onClick={onClick} fontWeight='bold'>
        {buttonName}
      </Button>
    );
};
