'use client';

import { captureException } from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string; statusCode?: number } }) {
  useEffect(() => {
    // 400번대 에러는 Sentry로 전송하지 않음
    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
      return;
    }

    captureException(error); // 400번대가 아닌 에러만 Sentry로 전송
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError`는 기본 Next.js 오류 페이지 컴포넌트입니다. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
