import type { AxiosRequestConfig } from "axios";
import type { Url } from "url";

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
  image: string;
  google_id?: string;
};

export type CompoundSearchResults = {
  name: string;
  //add more later
};

export type HeaderNavProps = {
  lang: string;
  name?: string;
  image?: Url;
};
export type ProfileUpdateValues = {
  name?: string;
  password?: string;
  password_confirmation?: string;
  image?: string;
};
export type MoviesData = {
  id: number;
  title: string;
  year: string;
  image: string;
  director: string;
  genres: { title: string; id: number }[];
  quote_num: string;
};
export type Quote = {
  movie_id: number;
  "quote.en": string;
  "quote.ge": string;
  image: File;
};
export type NewsFeedQuote = {
  author_avatar?: string;
  user_avatar?: string;
  author_name: string;
  quote_text: string;
  quote_image?: string;
  quote_year: string;
  quote_director: string;
  comment_number: number;
  react_number: number;
  comments: Array<{
    comment_author_name: string;
    comment_author_image?: string;
    comment_text: string;
  }>;
};
