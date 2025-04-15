'use client';

import Typography from '../ui/typography';

const ErrorComponent = () => {
  return (
    <section>
      <Typography>에러가 발생했습니다.🥲</Typography>
      <button onClick={() => window.location.reload()}>새로고침</button>
    </section>
  );
};

export default ErrorComponent;
