export const getErrorMessage = (error: unknown, message?: string): string =>
  error instanceof Error ? (message ?? error.message) : '알 수 없는 에러가 발생했습니다.';
