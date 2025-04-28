import { PATH } from '@/constants/path-constant';
import type { Tabs } from '@/types/tab-type';

const { MY_PAGE } = PATH;
/**
 *
 * @param tab 마이 페이지 내 탭 버튼 ( 내 면접기록 / 내 채용공고 / 내 자소서)
 * @param id 마이 피이지 내 디테일 페이지를 볼 게시글의 아이디
 * @returns query params
 */
export const getMyPagePath = (tab: Tabs, id?: string | number) => {
  const params = new URLSearchParams({ tab });
  if (id) params.set('id', id.toString());
  return `${MY_PAGE}?${params.toString()}`;
};
