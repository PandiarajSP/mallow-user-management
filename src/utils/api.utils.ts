import sessionService from "../services/session.service";
import { AppDispatch } from "../store";
import { setError } from "../store/errorSlice";
import AuthHeader from "./auth.header";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const commonApiService = async (
  url: string,
  method: HttpMethod,
  dispatch: AppDispatch,
  payload: object | null = null
) => {
  try {
    const headers = AuthHeader();
    const options: RequestInit = { method, headers };

    if (payload && method !== "GET") options.body = JSON.stringify(payload);

    const response = await fetch(url, options);
    const text = await response.text();
    let data: any = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (response.status === 401) {
      await sessionService.clear();
      dispatch(
        setError({
          title: "Authentication Failed",
          message: "Your session has expired. Please log in again.",
        })
      );
      window.location.href = "/login";
      return;
    }

    if (response.status === 403) {
      dispatch(
        setError({
          title: "Access Denied",
          message: "You do not have permission to perform this action.",
        })
      );
      return;
    }

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = "Something went wrong";

      try {
        const data = JSON.parse(text);
        if (typeof data === "object" && data !== null) {
          if ("error" in data && typeof data.error === "string") {
            errorMessage = data.error;
          } else if ("message" in data && typeof data.message === "string") {
            errorMessage = data.message;
          }
        } else if (typeof data === "string") {
          errorMessage = data;
        }
      } catch (e) {
        if (text) errorMessage = text;
      }

      throw new Error(errorMessage);
    }

    return data;
  } catch (err: any) {
    dispatch(
      setError({
        title: "Network or Unexpected Error",
        message: err?.message || "Something went wrong.",
      })
    );
    throw err;
  }
};

export default commonApiService;
