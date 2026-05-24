import {
  LoginRequest,
  RegisterRequest,
  ResendCodeRequest,
  VerifyEmailRequest,
} from "@/types/requests/auth/index";
import { GenericResponse } from "@/types/responses/generic-response";
import { apiClient } from "@/clients/axios";

export const authService = {
  login: async (credentials: LoginRequest): Promise<string> => {
    const response = await apiClient.post<GenericResponse<string>>("/api/Auth/login", credentials);
    return response.data.data;
  },

  register: async (data: RegisterRequest): Promise<string> => {
    const response = await apiClient.post<GenericResponse<string>>("/api/Auth/register", data);
    return response.data.message;
  },

  verifyEmail: async (data: VerifyEmailRequest): Promise<string> => {
    const response = await apiClient.post<GenericResponse<string>>(
      "/api/Auth/email-verification",
      data
    );
    return response.data.message;
  },

  resendVerificationCode: async (data: ResendCodeRequest): Promise<string> => {
    const response = await apiClient.post<GenericResponse<string>>(
      "/api/Auth/resend-verification-code",
      data
    );
    return response.data.data;
  },

  logout: async (token: string): Promise<string> => {
    const response = await apiClient.post<GenericResponse<string>>(
      "/api/Auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  },
};
