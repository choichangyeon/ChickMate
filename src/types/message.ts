export type Message = {
  role: 'system' | 'assistant' | 'user';
  content: Content[] | string;
};

export type Content = {
  type: string;
  text: string;
};
