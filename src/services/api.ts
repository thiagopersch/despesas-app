import axios, { AxiosInstance } from "axios";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface ApiConfig {
  baseURL: string | any;
  headers: {
    authorization: string;
  };
}

const createApi = (session?: Session | null): AxiosInstance => {
  const jwt = session?.jwt;
  const apiConfig: ApiConfig = {
    baseURL: process.env.SERVER_API_URL,
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  };

  const api = axios.create(apiConfig);

  api.interceptors.request.use((config) => {
    const params = config.params || {};
    const newParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== "" && value !== undefined && value !== null,
      ),
    );

    config.params = newParams;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401) {
        signOut({
          callbackUrl: "/",
          redirect: true,
        });
        return undefined;
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;
