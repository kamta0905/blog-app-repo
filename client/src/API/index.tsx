import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3001";
interface AuthToken {
  token: string;
}
interface ApiResponse<T = any> {
  data: T;
  status: number;
}
interface ErrorResponse {
  error: boolean;
  message: string[];
}
interface RequestConfig extends AxiosRequestConfig {
  headers?: {
    Authorization?: string;
  };
}
interface SignInParams {
  email: string;
  password: string;
}
interface SignUpParams {
  email: string;
  password: string;
  name: string;
  isAdmin: number;
}
interface SignInResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
interface SignUpResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
const authToken = async (): Promise<string | undefined> => {
  const auth = await localStorage.getItem("auth");
  const { token } = !!auth ? JSON.parse(auth) : null;
  return token;
};

const adminAuthToken = async (): Promise<string | undefined> => {
  const auth = await localStorage.getItem("accessToken");
  if (auth) {
    return auth;
  }
  return undefined;
};

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
const admin = {
  signIn: async (params: SignInParams): Promise<SignInResponse | ErrorResponse> => {
    try {
      const res = await post<SignInResponse>(`${BASE_URL}/api/admin/login`, undefined, params);
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
  signUp: async (params: SignUpParams): Promise<SignUpResponse | ErrorResponse> => {
    try {
      const res = await post<SignUpResponse>(`${BASE_URL}/api/admin/register`, undefined, params);
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
  getProfile: async (): Promise<any> => {
    try {
      const tokenConfig = await adminAuthToken();
      const response = await axios.get<any>(`${BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: tokenConfig,
        },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  },

  updateProfile: async (profileData: {
    name: string;
    email: string;
    gender: string;
    bio: string;
    profession: string;
    dateOfBirth: string;
  }) => {
    try {
      const tokenConfig = await adminAuthToken();
      const response = await axios.put<any>(`${BASE_URL}/api/users/profile`, profileData, {
        headers: {
          Authorization: tokenConfig,
        },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  },
};

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
