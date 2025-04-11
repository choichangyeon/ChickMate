import Typography from '@/components/ui/typography';

const Timer = () => {
  return (
    <div className='flex h-[220px] w-[526px] flex-shrink-0 flex-col items-center justify-center gap-4 border-2 p-6'>
      <div className='flex flex-col items-center'>
        <Typography size='2xl'>제한시간 안에 답변을 완료하세요</Typography>
        <Typography size='sm' weight='medium'>
          타이머가 종료되면 자동으로 답변이 종료됩니다
        </Typography>
      </div>
      <div>
        <Typography color='primary-600' size='3xl' weight='black'>
          3:00
        </Typography>
      </div>
      <div>
        <button>답변 종료</button>
      </div>
    </div>
  );
};

export default Timer;
