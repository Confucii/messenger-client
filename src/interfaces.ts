export interface AuthContextInterface {
  user: string;
  dispatch: React.Dispatch<{ type: string }>;
}

export interface ResponseError {
  response: {
    status: number;
    data: { error: { errors: { [key: string]: Dict } } };
  };
}

export interface Dict {
  [key: string]: string;
}

export interface MessageInterface {
  id: string;
  sender: { displayName: string; id: string };
  text: string;
  timestamp: string;
}

export interface ChatInterface {
  id: string;
  interlocutor: { name: string; id: string };
  messages: MessageInterface[];
}

export interface UserInterface {
  id: string;
  displayName: string;
  status: string;
}
