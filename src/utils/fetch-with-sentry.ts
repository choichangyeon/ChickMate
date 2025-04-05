import { captureException } from '@sentry/nextjs';

type FetchOptions = Omit<RequestInit, 'body'> & {
  body?: string | FormData | URLSearchParams | Blob | null;
};

/**
 * 공통 fetch 요청 래퍼입니다. 에러 처리 및 Sentry 로깅을 포함합니다.
 *
 * @param {string} url - 요청을 보낼 URL
 * @param {RequestInit & { body?: any }} options - fetch 설정 객체
 * @returns {Promise<any>} JSON으로 파싱된 응답 데이터
 * @throws {Error} 요청이 실패하면 에러를 throw합니다.
 */
export const fetchWithSentry = async (url: string, options: FetchOptions = {}) => {
  const { method, body, headers, ...rest } = options;

  const res = await fetch(url, {
    ...rest,
    method: method,
    headers: headers,
    body: body,
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status >= 500) {
      const error = new Error(`message: ${data.message}, status: ${res.status}`);
      captureException(error, {
        extra: {
          url,
          status: res.status,
          response: data,
        },
      });
    }
    throw new Error(data.message);
  }

  return data;
};
