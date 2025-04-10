const SelectInterviewerBox = () => {
  return (
    <div className='relative h-80 w-96 overflow-hidden rounded-lg bg-emerald-900/0 outline outline-1 outline-offset-[-1px] outline-yellow-500'>
      <div className="absolute left-[133px] top-[89px] justify-start text-center font-['SUIT_Variable'] text-2xl font-bold leading-10 text-black">
        불타는 면접관
      </div>
      <div className="absolute left-[88px] top-[136px] justify-start text-center font-['SUIT_Variable'] text-base font-bold leading-normal text-black/50">
        이 면접관은 냉철하고 비판적인 사고를
        <br />
        통해 면접자를 평가합니다.
      </div>
      <div className='absolute left-[90px] top-[217px] inline-flex h-9 w-56 items-center justify-center gap-2.5 rounded-[50px] p-2.5 outline outline-1 outline-offset-[-1px] outline-black'>
        <div className="justify-start text-center font-['SUIT_Variable'] text-xl font-bold leading-loose text-black">
          선택 완료
        </div>
      </div>
    </div>
  );
};

export default SelectInterviewerBox;
