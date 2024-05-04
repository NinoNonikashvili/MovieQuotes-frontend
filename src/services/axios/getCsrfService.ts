import instance from "./instance";

export default async () => {
  instance.get("/sanctum/csrf-cookie");
};
