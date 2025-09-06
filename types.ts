
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  sources?: {
    uri: string;
    title: string;
  }[];
}
