import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';

type Props = {
  name: string;
  email: string;
  password: string;
};

const { AUTH } = ROUTE_HANDLER_PATH;
const { SIGN_UP } = AUTH;

// 추후 merge 시 변경할 부분
const API_METHOD = {
  POST: 'POST',
};

const { POST } = API_METHOD;

/**
 * 회원가입 요청을 서버에 전송합니다.
 *
 * @param {Object} data - 회원가입에 필요한 사용자 정보
 * @param {string} data.name - 사용자 이름
 * @param {string} data.email - 사용자 이메일
 * @param {string} data.password - 사용자 비밀번호
 * @returns 서버로 요청을 보낸 후 아무 값도 반환하지 않습니다.
 */
export const postSignUp = async (data: Props) => {
  await fetchWithSentry(SIGN_UP, {
    method: POST,
    body: JSON.stringify(data),
  });
};
