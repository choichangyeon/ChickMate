import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';

const { ON_BOARDING } = PATH;
const Home = () => {
  return (
    <main>
      <p>우리는 언제 불닭이 될 수 있을까?</p>
      <div>
        <p>스마트 면접 코칭 </p>
        <Typography as='h1'>Chick Mate</Typography>
      </div>
      <p>칰메이트와 함께하는 AI 스마트 코칭 시스템!</p>
      <Button link href={ON_BOARDING}>
        지금 바로 시작해볼까요?
      </Button>

      <Button>default</Button>
      <Button variant='contained' color='primary'>
        contained & primary
      </Button>
      <Button variant='contained' color='secondary'>
        contained & secondary
      </Button>
      <Button variant='outline' color='secondary'>
        outline & secondary
      </Button>
      <Button variant='ghost' color='secondary'>
        ghost & secondary
      </Button>
    </main>
  );
};

export default Home;
