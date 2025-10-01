import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";
import {post} from "@/utils/request";

export const AuthService = {
  login: (data: LoginBodyType) =>
    post<LoginResType>("/api/Auth/sign-in", data, {
      requireAuth: false,
    }),
  auth: (data: { sessionToken: string; expiresAt?: string; roleUser?: string}) =>
    post<LoginResType>("/api/auth", data,{
      requireAuth: false,
      baseUrl: ""
    }),
};