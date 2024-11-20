import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create();

interface ApiConnectorParams {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: object | string;
  headers?: object;
  params?: object;
}

const apiConnector = async ({
  method,
  url,
  data,
  headers,
  params,
}: ApiConnectorParams): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers,
      params,
    });
    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error; 
  }
};

export default apiConnector;
