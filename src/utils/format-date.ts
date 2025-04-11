/**
 *
 * @param input - Date 객체 또는 날짜 문자열
 * @returns "yyyy.mm.dd" 형식의 날짜 문자열
 */
type Props = {
  input: Date | string;
};
export const formatDate = ({ input }: Props): string => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};
