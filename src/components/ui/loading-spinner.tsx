type LoadingSpinnerProps = {
  /** Tailwind 크기 클래스 (ex: 'h-12 w-12') */
  sizeClass?: string;
};

const LoadingSpinner = ({ sizeClass = 'h-12 w-12' }) => {
  return (
    <div
      className={`animate-spin rounded-full ${sizeClass} border-4 border-b-secondary-amber border-l-secondary-yellow border-r-secondary-amber border-t-secondary-yellow opacity-80`}
    />
  );
};

export default LoadingSpinner;
