export const getOpenAIResponse = async (messageList) => {
  try {
    const res = await fetch('/api/ai/interview', {
      method: 'POST',
      body: JSON.stringify({ messageList: messageList }),
    });

    // messageList.push({
    //   role: 'assistant',
    //   content: [
    //     {
    //       type: 'text',
    //       text: response.choices[0].message.content,
    //     },
    //   ],
    // });

    return messageList;
  } catch (error) {
    console.error('getSample 에러:', error);
    throw error;
  }
};
