import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { JobPosting } from '@prisma/client';

const { POST } = API_METHOD;

// export const postBookmarkWithUserId = async (messageList: Message[]): Promise<Message[]> => {
//   const res = await fetchWithSentry(INTERVIEW, {
//     method: POST,
//     body: JSON.stringify({ messageList: messageList }),
//   });

//   messageList.push({
//     role: 'assistant',
//     content: [
//       {
//         type: 'text',
//         text: res.text,
//       },
//     ],
//   });

//   return messageList;
// };
