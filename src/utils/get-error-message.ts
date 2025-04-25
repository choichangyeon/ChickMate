export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.';
