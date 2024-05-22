import type { AxiosRequestConfig } from "axios";

export type AuthLayoutType = {
  header_key: string;
  sub_header_key: string;
  footer_text_key: string;
  footer_link_text_key?: string;
  footer_link?: string;
  go_back?: boolean;
};

export type NotificationType = {
  icon: any;
  header_key: string;
  paragraph_key: string;
  link_text_key: string;
  link: string;
  redirect?: boolean;
};

export type Locales = "en" | "ge";

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export type LoginUser = {
  email?: string;
  name?: string;
  password: string;
  rememberMe: boolean;
};

export type VerificationMessageProps = {
  isVerified: boolean;
  email: string;
  handler: string;
};

export type EmailArgument = {
  [email: string]: string;
};

export type verifyEmailConfig = {
  query: AxiosRequestConfig;
  params: string;
};
export type ResetPasswordConfig = {
  password: string;
  password_confirmation: string;
  email: string;
  token: string;
};
export type IconProps = {
  color: string;
};

export type AuthUserData = {
  //add profile photo after it is ready in backend
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  google_id?: string;
};

export type CompoundSearchResults = {
  name: string;
  //add more later
};
