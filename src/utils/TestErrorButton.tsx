// TestErrorButton.tsx
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Button } from "antd";
import commonApiService from "./api.utils";

const TestErrorButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Define the test function
  const testCommonApiService = async (dispatch: AppDispatch) => {
    try {
      // Hardcoded URL to simulate a 404 error
      const fakeUrl = "https://reqres.in/api/users/99999"; // non-existent user
      const result = await commonApiService(fakeUrl, "GET", dispatch);
      console.log("API result:", result);
    } catch (err) {
      console.log("Caught error:", err);
    }
  };

  return (
    <Button
      onClick={() => {
        testCommonApiService(dispatch);
      }}
    >
      Test Global Error
    </Button>
  );
};

export default TestErrorButton;
