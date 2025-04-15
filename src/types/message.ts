export type Message = {
  role: 'system' | 'assistant' | 'user';
  content: Content[];
};

export type Content = {
  type: string;
  text: string;
};
