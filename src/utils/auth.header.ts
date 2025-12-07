export default function AuthHeader(): { [key: string]: string } {
  const API_KEY = "reqres_7fe0387631e54862ab5fc41cc1ac7833";

  return {
    "x-api-key": API_KEY,
    "Content-Type": "application/json;charset=UTF-8",
  };
}
