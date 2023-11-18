export interface AuthContextInterface {
  user: boolean;
  dispatch: React.Dispatch<{ type: string }>;
}
