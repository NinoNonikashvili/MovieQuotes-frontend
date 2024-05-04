import type {
  RegisterUser,
  LoginUser,
  EmailArgument,
  ResetPasswordConfig,
} from "@/types/types";
import instance from "@/services/axios/instance";

export async function register(user: RegisterUser) {
  return await instance.post("/api/register", user);
}

export async function login(user: LoginUser) {
  return await instance.post("/api/login", user);
}
export async function resendEmailVerification(email: EmailArgument) {
  return await instance.post("/api/email/verification-notification", email);
}

export async function verifyEmail(urlSignedPart: string) {
  return await instance.get("/api/email/verify/" + urlSignedPart);
}

export async function checkAuthState() {
  return await instance.get("/api/check-auth");
}

export async function logout() {
  return await instance.get("/api/logout");
}
export async function forgot_password(payload: EmailArgument) {
  return await instance.post("api/forgot-password", payload);
}
export async function reset_password(payload: ResetPasswordConfig) {
  return await instance.post("/api/reset-password", payload);
}
