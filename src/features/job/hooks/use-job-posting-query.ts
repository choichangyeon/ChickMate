// import { QUERY_KEY } from '@/constants/query-key';
// import { useQuery } from '@tanstack/react-query';
// import { getJobByUserMetaData } from '@/features/job/api/client-services';
// import { STALE_TIME } from '@/constants/time-constants';

// const { JOB_POSTING } = QUERY_KEY;
// const { AN_HOUR } = STALE_TIME;

// export const useJobPostingQuery = () => {
//   return useQuery({
//     queryKey: [JOB_POSTING],
//     queryFn: () => {
//       return getJobByUserMetaData({
//         educationLevel: '대졸(4년)',
//         location: { mainRegion: '경남' },
//         experienceType: '신입',
//         jobType: '의료',
//       });
//     },
//     staleTime: AN_HOUR,
//   });
// };
