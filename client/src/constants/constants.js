export const baseURL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "/";

export const API_ENDPOINTS = {
  newGame: "/game/new",
  joinGame: "/game/join-game",
  boardOptions: "/game/patterns",
  gameReport: "/game/report/",
};
