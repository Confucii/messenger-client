export interface AuthContextInterface {
  user: boolean;
  dispatch: React.Dispatch<{ type: string }>;
}

export interface LoginError {
  response: { status: number };
}
