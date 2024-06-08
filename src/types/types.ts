import type { AxiosRequestConfig } from "axios";
import { InputLanguages, NotificationActions } from "./constants";

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
  image?: string;
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
  description: string;
  genres: { title: string; id: string }[];
  quote_num: string;
};
export type MoviesDataBilingual = {
  id: number;
  title: { en: string; ge: string };
  year: string;
  image: string;
  director: { en: string; ge: string };
  description: { en: string; ge: string };
  genres: { title: string; id: number }[];
};
export type Quote = {
  movie_id: number;
  "quote.en": string;
  "quote.ge": string;
  image: File;
};
export type NewsFeedQuote = {
  quote_id: string;
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
  has_user_loved: boolean;
};

export type SingleMovieQuote = {
  id: string;
  quote_image: string;
  quote: string;
  comment_number: string;
  react_number: string;
};

export type QuoteNotification = {
  quote_id: string;
  user_id: string;
  type: QuoteNotificationAction;
  comment: string | null;
  seen: boolean;
};

export type QuoteHeartNotifiation = {
  quote_id: string;
  user_id: string;
};

export type QuoteNotifications = {
  notification_id: number;
  quote_id: number;
  notification_author_image: string;
  notification_author_name: string;
  action: QuoteNotificationAction;
  create_at: string;
  seen: boolean;
};

export type Language = (typeof InputLanguages)[number];
export type QuoteNotificationAction = (typeof NotificationActions)[number];
