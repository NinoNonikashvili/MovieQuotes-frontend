import {  google_auth_redirect } from "@/services/axios/auth-services";

export async function useGmail() {
  try {
    const response = await google_auth_redirect();
    window.location.href = response.data.url;
    console.log(response.data.url);
  } catch (err) {
    console.log(err);
  }
}
