import commonApiService from "../utils/api.utils";
import { AppDispatch } from "../store";
const apiUrl = process.env.REACT_APP_API_URL;
class userService {
  async fetchUsers(
    dispatch: AppDispatch,
    payload: { page: number; per_page: number }
  ) {
    try {
      const { page, per_page } = payload;
      const url = `${apiUrl}/users/?page=${page}&per_page=${per_page}`;
      const resp = await commonApiService(url, "GET", dispatch);
      return resp;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createUser(dispatch: AppDispatch, payload: object) {
    try {
      let url = `${apiUrl}/register`;
      let resp = await commonApiService(url, "POST", dispatch, payload);
      return resp;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async updateUser(dispatch: AppDispatch, payload: object, id: string) {
    try {
      let url = `${apiUrl}/users/${id}`;
      let resp = await commonApiService(url, "PUT", dispatch, payload);
      return resp;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async deleteUser(dispatch: AppDispatch, id: string) {
    try {
      let url = `https://reqres.in/api/users/${id}`;
      let resp = await commonApiService(url, "DELETE", dispatch, null);
      return resp;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new userService();
