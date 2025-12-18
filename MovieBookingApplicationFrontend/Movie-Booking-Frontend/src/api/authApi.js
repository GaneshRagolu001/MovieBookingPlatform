import axiosClient from "./axiosClient";

export const loginApi = (data) => {
  console.log(data);
  return axiosClient.post("/auth/login", data);
};

export const registerApi = (data) => axiosClient.post("/auth/registernormaluser", data);

export const currentUserApi = () => axiosClient.get("/auth/getcurrentuser");