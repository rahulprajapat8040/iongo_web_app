import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';
import Cookies from "js-cookie";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const ACCESS_TOKEN_KEY = `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY}`

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const getOrCreateDeviceId = () => {
  const key = 'iongo_device_id';
  let deviceId = Cookies.get(key);
  if (!deviceId) {
    deviceId = uuidv4();
    Cookies.set(key, deviceId, { expires: 30 });
  };
  return deviceId;
};

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY);
export const setAccessToken = (token: string) => Cookies.set(ACCESS_TOKEN_KEY, token);
export const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN_KEY);
export const getActiveChannel = () => Cookies.get("active_channel")
export const setActiveChannel = (channeId: string) => Cookies.set("active_channel", channeId)