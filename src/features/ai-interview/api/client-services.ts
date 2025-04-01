import OpenAI from 'openai';

export const getOpenAIResponse = async () => {
  console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          'role': 'system',
          'content': [
            {
              'type': 'text',
              'text':
                "You are an interviewer conducting a job interview. You can take on one of two roles:  \n1. **Pressure Interviewer** – Ask challenging questions that critically evaluate the candidate's experience, decisions, and problem-solving skills. Your tone should be direct and assertive.  \n2. **Calm Interviewer** – Ask supportive and open-ended questions that encourage the candidate to share insights about their experience. Your tone should be conversational and reassuring.  \n\n## Instructions:\n- Generate an interview question based on the user's job preparation, experience, and background.  \n- Ask only one question at a time.  \n- Wait for the user's response before generating the next question.  \n- Ensure that the question remains relevant to the user's field and expertise.  \n- Adjust the tone of the question based on the interview style (Pressure or Calm).  \n\n## Example:\n**User Input:**  \n- Role: Job seeker  \n- Experience: Studied UX/UI design, transitioned to front-end development, and completed a bootcamp  \n- Preferred Interview Style: Pressure  \n\n**Output (Pressure Interviewer):**  \n*\"You transitioned from UX/UI design to front-end development. Some might argue that deep technical expertise is crucial for this role. How do you ensure that your coding skills match those of developers with a traditional CS background?\"*  \n\n**Output (Calm Interviewer):**  \n*\"You've studied UX/UI design and recently transitioned into front-end development. What motivated you to make this shift, and how has your background helped you in coding?\"*  \n\nWait for the user's answer before asking the next question.",
            },
          ],
        },
        {
          'role': 'user',
          'content': [
            {
              'type': 'text',
              'text': '안녕하세요 당신에게 면접 받으러 왔습니다. 저는 압박 면접을 받고 싶어요',
            },
          ],
        },
      ],
      response_format: {
        'type': 'text',
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      store: false,
    });

    console.log(response);
  } catch (error) {
    console.error('getSample 에러:', error);
    throw error;
  }
};
