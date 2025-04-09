'use client';

import Title from '../ui/title';

const ErrorComponent = () => {
  return (
    <section>
      <Title>에러가 발생했습니다.</Title>
      <button onClick={() => window.location.reload()}>새로고침</button>
    </section>
  );
};

export default ErrorComponent;
