function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <div style={{ color: "red" }}>{errorMessage}</div>;
}

export default ErrorMessage;
