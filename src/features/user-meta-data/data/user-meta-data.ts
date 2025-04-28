import type { SelectBoxType } from '@/types/select-box';
import type { RegionsType } from '@/types/user-meta-data-type';

export const typeData: SelectBoxType[] = [
  {
    name: '신입',
    value: '신입',
  },
  {
    name: '경력',
    value: '경력',
  },
];

export const academicData: SelectBoxType[] = [
  {
    name: '학력무관',
    value: '학력무관',
  },
  {
    name: '고등학교졸업',
    value: '고등학교졸업',
  },
  {
    name: '대학졸업(2,3년)',
    value: '대학졸업(2,3년)',
  },
  {
    name: '대학교졸업(4년)',
    value: '대학교졸업(4년)',
  },
  {
    name: '석사졸업',
    value: '석사졸업',
  },
  {
    name: '박사졸업',
    value: '박사졸업',
  },
];

export const jobData: SelectBoxType[] = [
  { name: '기획·전략', value: '기획·전략' },
  { name: '마케팅·홍보·조사', value: '마케팅·홍보·조사' },
  { name: '회계·세무·재무', value: '회계·세무·재무' },
  { name: '인사·노무·HRD', value: '인사·노무·HRD' },
  { name: '총무·법무·사무', value: '총무·법무·사무' },
  { name: 'IT개발·데이터', value: 'IT개발·데이터' },
  { name: '디자인', value: '디자인' },
  { name: '영업·판매·무역', value: '영업·판매·무역' },
  { name: '고객상담·TM', value: '고객상담·TM' },
  { name: '구매·자재·물류', value: '구매·자재·물류' },
  { name: '상품기획·MD', value: '상품기획·MD' },
  { name: '운전·운송·배송', value: '운전·운송·배송' },
  { name: '서비스', value: '서비스' },
  { name: '생산', value: '생산' },
  { name: '건설·건축', value: '건설·건축' },
];

export const regions: RegionsType[] = [
  { name: '서울', value: '서울' },
  { name: '경기', value: '경기' },
  { name: '인천', value: '인천' },
  { name: '부산', value: '부산' },
  { name: '대구', value: '대구' },
  { name: '광주', value: '광주' },
  { name: '대전', value: '대전' },
  { name: '울산', value: '울산' },
  { name: '세종', value: '세종' },
  { name: '강원', value: '강원' },
  { name: '경남', value: '경남' },
  { name: '경북', value: '경북' },
  { name: '전남', value: '전남' },
  { name: '전북', value: '전북' },
  { name: '충남', value: '충남' },
  { name: '충북', value: '충북' },
  { name: '제주', value: '제주' },
];
