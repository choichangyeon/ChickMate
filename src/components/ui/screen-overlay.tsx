type Props = {
  overlayText: string;
};

// 상위 컴포넌트에 relative 적용 필수

const ScreenOverlay = ({ overlayText }: Props) => {
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-sm'>
      <span className='text-sm font-semibold text-black/70'>{overlayText}</span>
    </div>
  );
};

export default ScreenOverlay;
