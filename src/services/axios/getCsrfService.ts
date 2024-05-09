import instance from "@/plugins/axios/index";

export default async () => {
  instance.get("/sanctum/csrf-cookie");
};
