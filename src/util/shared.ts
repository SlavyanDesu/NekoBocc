import { AxiosRequestConfig } from "axios";

export const baseUrl = "https://nekopoi.care";

export const axiosConfig: AxiosRequestConfig = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    Referer: baseUrl,
    "Accept-Language": "en-US,en;q=0.9",
  },
};

export const valid = (url: string) =>
  url.match(new RegExp(/^(?:https?:\/\/)?(?:[^.]+\.)?nekopoi\.care(\/.*)?$/gm));

export const endpoints = {
  latest: "/category/hentai/page/__PAGE",
  search: "/search/__QUERY",
  random: "/random",
};
