import Typography from '@/components/ui/typography';
const SelectInterviewerBox = () => {
  return (
    <div>
      <aside className='flex h-80 w-96 flex-col items-center justify-center overflow-hidden rounded-lg bg-emerald-900/0 outline outline-1 outline-offset-[-1px] outline-yellow-500'>
        <div>
          <Typography as='h3' size='3xl' weight='bold' align='center'>
            불타는 면접관
          </Typography>
          <Typography color='gray-300' align='center'>
            이 면접관은 냉철하고 비판적인 사고를
          </Typography>
          <Typography color='gray-300' align='center'>
            통해 면접자를 평가합니다.
          </Typography>
        </div>
        <div className=''>
          <Typography weight='bold'>선택 완료</Typography>
        </div>
      </aside>
    </div>
  );
};

export default SelectInterviewerBox;
