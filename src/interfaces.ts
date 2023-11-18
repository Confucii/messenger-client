export interface AuthContextInterface {
  user: string;
  dispatch: React.Dispatch<{ type: string }>;
}

export interface LoginError {
  response: { status: number };
}
