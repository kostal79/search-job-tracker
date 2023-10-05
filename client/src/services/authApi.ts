import axios from "axios";
import { SERVER_URL } from "../constants";
import { IUserAuth } from "../types/types";

export async function isAuth(): Promise<IUserAuth> {
  const response = await axios.get(`${SERVER_URL}/api/auth/isauth`, {
    withCredentials: true,
  });
  return response.data;
}

interface ILogoutResponse {
  authenticated: boolean;
}

export async function logoutUser(): Promise<ILogoutResponse> {
  const response: ILogoutResponse = await axios.get(
    `${SERVER_URL}/api/auth/logout`,
    { withCredentials: true }
  );
  return response;
}
