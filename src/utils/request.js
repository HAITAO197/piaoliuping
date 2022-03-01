import axios from "axios";
import QueryString from "qs";
// import qs from "qs";
const request = axios.create({
  baseURL: "http://www.windroid.cn:8083",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
export const query = () => {
  return request({
    method: "GET",
    url: "/query",
  });
};
export const create = (data) => {
  return request({
    method: "POST",
    url: "/create",
    data: QueryString.stringify({ msg: data }),
  });
};
export const reply = (data) => {
  return request({
    method: "POST",
    url: "/huifu",
    data: QueryString.stringify(data),
  });
};
