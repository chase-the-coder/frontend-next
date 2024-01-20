import axios, { AxiosResponse, Method } from "axios";

interface RequestParams {
  endpoint: string;
  data?: any;
  token?: string;
}

async function request(
  method: Method,
  { endpoint, data, token }: RequestParams
): Promise<AxiosResponse> {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axios({
    method,
    url,
    data,
    headers,
  });

  return response;
}

export const get = (params: RequestParams) => request("GET", params);
export const post = (params: RequestParams) => request("POST", params);
