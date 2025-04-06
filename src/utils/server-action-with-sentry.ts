import { captureException } from '@sentry/nextjs';

type Props<T> = () => Promise<T>;

export const serverActionWithSentry = async <T>(fn: Props<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    const statusCode = error?.status || error?.response?.status;
    console.log(error);
    if (statusCode >= 500 || statusCode === undefined) {
      captureException(error);
    }

    throw error;
  }
};
