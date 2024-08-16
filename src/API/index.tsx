import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "";

// Interface for the authentication token
interface AuthToken {
  token: string;
}

// Interface for API responses
interface ApiResponse<T = any> {
  data: T;
  status: number;
}

// Interface for error response
interface ErrorResponse {
  error: boolean;
  message: string[];
}

// Define the request configuration interface
interface RequestConfig extends AxiosRequestConfig {
  headers?: {
    Authorization?: string;
  };
}

// Define the structure of the sign-in request parameters
interface SignInParams {
  email: string;
  password: string;
}

// Define the structure of the sign-in response data
interface SignInResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Function to get auth token from local storage
const authToken = async (): Promise<string | undefined> => {
  const auth = await localStorage.getItem("auth");
  const { token } = !!auth ? JSON.parse(auth) : null;
  return token;
};

// Function to get admin auth token from local storage
const adminAuthToken = async (): Promise<string | undefined> => {
  const auth = await localStorage.getItem("admin-auth");
  const { token } = !!auth ? JSON.parse(auth) : null;
  return token;
};

// POST request function
const post = async <T = any,>(
  url: string,
  token: string | undefined,
  data: Record<string, any> = {},
  _config: RequestConfig = {}
): Promise<ApiResponse<T> | ErrorResponse> => {
  const config: RequestConfig = { ..._config };
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axios.post(url, data, config);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { error: true, message: [error.message] };
  }
};

// PUT request function
const put = async <T = any,>(
  url: string,
  token: string | undefined,
  data: Record<string, any> = {},
  _config: RequestConfig = {}
): Promise<ApiResponse<T> | ErrorResponse> => {
  const config: RequestConfig = { ..._config };
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axios.put(url, data, config);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { error: true, message: [error.message] };
  }
};

const get = async <T = any,>(
  url: string,
  token: string | undefined,
  _config: RequestConfig = {}
): Promise<ApiResponse<T> | ErrorResponse> => {
  const config: RequestConfig = { ..._config };
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axios.get(url, config);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { error: true, message: [error.message] };
  }
};

// Admin API functions
const admin = {
  signIn: async (params: SignInParams): Promise<SignInResponse | ErrorResponse> => {
    try {
      const res = await post<SignInResponse>(`${BASE_URL}/api/users/login`, undefined, params);
      if ("status" in res && res.status === 400) {
        return { error: true, message: [res.data.message] };
      } else if ("statusCode" in res && res.statusCode === 401) {
        return { error: true, message: ["Incorrect Email Address or password."] };
      }
      return res as any;
    } catch (e: any) {
      return { error: true, message: [e.message] };
    }
  },
};

// Auth API functions
const auth = {
  signIn: async (params: SignInParams): Promise<SignInResponse | ErrorResponse> => {
    try {
      const res = await post<any>(`${BASE_URL}/api/users/login`, undefined, params);
      if ("status" in res && res.status === 400) {
        return { error: true, message: [res.data] };
      } else if ("statusCode" in res && res.statusCode === 401) {
        return { error: true, message: ["Incorrect Email Address or password."] };
      }
      return res as any;
    } catch (e: any) {
      return { error: true, message: [e?.message] };
    }
  },
};

export { auth, admin };
