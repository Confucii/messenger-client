export interface AuthContextInterface {
  user: string;
  dispatch: React.Dispatch<{ type: string }>;
}

export interface ResponseError {
  response: { status: number; data: { error: string } };
}

export interface MessageInterface {
  id: string;
  sender: { displayName: string; id: string };
  text: string;
  timestamp: string;
}

export interface ChatInterface {
  id: string;
  interlocutor: string;
  messages: MessageInterface[];
}
