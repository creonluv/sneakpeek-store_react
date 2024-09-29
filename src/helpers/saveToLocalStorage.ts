import { ParamsState } from "../features/params";

export const saveToLocalStorage = (state: ParamsState) => {
  localStorage.setItem("filterParams", JSON.stringify(state));
};
