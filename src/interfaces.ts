export interface AuthContextInterface {
  user: string;
  dispatch: React.Dispatch<{ type: string }>;
}

export interface ResponseError {
  response: { status: number; data: { error: string } };
}

export interface Message {
  sender: { displayName: string; id: string };
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  interlocutor: string;
  messages: Message[];
}
