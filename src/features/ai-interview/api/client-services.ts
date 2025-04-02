import OpenAI from 'openai';

export const getOpenAIResponse = async (messageList) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messageList,
      response_format: {
        'type': 'text',
      },
      temperature: 1,
      max_completion_tokens: 200,
      top_p: 1,
      store: false,
    });

    messageList.push({
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: response.choices[0].message.content,
        },
      ],
    });

    return messageList;
  } catch (error) {
    console.error('getSample 에러:', error);
    throw error;
  }
};
