import { atom } from "recoil";

const tabState = atom({
  key: "tabState", // unique ID (with respect to other atoms/selectors)
  default: "dashboard",
});

export default tabState;