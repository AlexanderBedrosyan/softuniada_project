import { jwtDecode } from "jwt-decode";
export const getUserFromLocalStorage = () => {
  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("authTokens")
  ) {
    return jwtDecode(localStorage.getItem("authTokens"));
  } else {
    return null;
  }
};
