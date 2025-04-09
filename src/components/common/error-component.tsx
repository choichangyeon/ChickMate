'use client';

const ErrorComponent = () => {
  return (
    <section>
      <h1>에러가 발생했습니다.</h1>
      <button onClick={() => window.location.reload()}>새로고침</button>
    </section>
  );
};

export default ErrorComponent;
