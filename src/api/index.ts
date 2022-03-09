import request from "./request";

// 翻译
export function translate(data?: object) {
  return request.get("/trans", { data });
}
