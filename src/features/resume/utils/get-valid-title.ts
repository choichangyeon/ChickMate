export const getValidTitle = (title: string) => {
  return title.trim() === '' ? '제목 없음' : title;
};
