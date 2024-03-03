export const getAuthTokensFromLocalStorage = () => {
  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("authTokens")
  ) {
    return JSON.parse(localStorage.getItem("authTokens"));
  } else {
    return null;
  }
};
