import { AppDispatch } from "../store";
import commonApiService from "../utils/api.utils";
const apiUrl = process.env.REACT_APP_API_URL;
class AuthService {
  async loginUser(dispatch: AppDispatch, payload: object) {
    try {
      let url = `${apiUrl}/login`;

      const resp = await commonApiService(url, "POST", dispatch, payload);
      return resp;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async logoutUser(dispatch: AppDispatch) {
    try {
      let url = `https://reqres.in/api/logout`;

      const resp = await commonApiService(url, "POST", dispatch);
      return resp;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new AuthService();
