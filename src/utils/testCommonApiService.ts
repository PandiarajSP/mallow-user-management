
import { store } from "../store"; // your Redux store
import { AppDispatch } from "../store";
import commonApiService from "./api.utils";

const dispatch: AppDispatch = store.dispatch;

async function testCommonApiService() {
  try {
    // Simulate a 404 error (hardcoded)
    const fakeUrl = "https://reqres.in/api/users/999"; // assuming this ID doesn't exist
    const result = await commonApiService(fakeUrl, "GET", dispatch);
    console.log("API result:", result);
  } catch (err) {
    console.error("Caught error:", err);
  }
}

// Call the test
testCommonApiService();
