import instance from "@/plugins/axios";

export async function updateProfile(payload: FormData) {
  return await instance.post("/api/update-profile", payload);
}
export async function getUpdatedUser(){
  return await instance.get("/api/updated-user")
}