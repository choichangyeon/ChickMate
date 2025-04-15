/**
 * @function sanitizeQueryParams
 * @param searchParams - URLSearchParams
 * @returns {Record<string, string>} - 정리된 쿼리 파라미터 객체 구조 분해로 할당
 * @description - 쿼리 파라미터를 정리하는 함수
 */
export const sanitizeQueryParams = (searchParams: URLSearchParams): Record<string, string> => {
  const sanitizedParams: { [key: string]: string } = {};
  for (const [key, value] of searchParams.entries()) {
    const safeValue = value
      .replace(/<script.*?>.*?<\/script>/gi, '') // 스크립트 태그 제거
      .replace(/[<>]/g, ''); // <, > 같은 특수문자 제거

    sanitizedParams[key] = safeValue;
  }
  return sanitizedParams;
};
