export default function AuthHeader(): { [key: string]: string } {
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!apiKey) {
    throw new Error("API key is not defined. Please check your environment variables.");
  }

  return {
    "x-api-key": apiKey,
    "Content-Type": "application/json;charset=UTF-8",
  };
}
