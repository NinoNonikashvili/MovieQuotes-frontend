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
};
