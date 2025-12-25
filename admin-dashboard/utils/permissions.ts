import { DecodedToken } from "./token";

export const isAdmin = (tokenData: DecodedToken | null): boolean => {
  if (!tokenData) return false;
  return Boolean(tokenData.is_staff || tokenData.is_superuser);
};

export const canAccessAdmin = (tokenData: DecodedToken | null): boolean => {
  return isAdmin(tokenData);
};
