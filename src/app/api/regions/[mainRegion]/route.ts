// import { subRegion } from '@/features/user-meta-data/data/user-meta-data';
// import { NextResponse } from 'next/server';

// type Props = {
//   params: {
//     mainRegion: string;
//   };
// };

// export async function GET(req: Request, { params }: Props) {
//   const { mainRegion } = params;
//   const subRegions = subRegion[mainRegion];
//   if (!subRegions) {
//     return NextResponse.json({ error: '지역을 다시 선택해 주세요.' }, { status: 404 });
//   }
//   return NextResponse.json(subRegions);
// }

// @TODO: 사람인 API 연결 시 되살릴 예정
