import { atom } from "recoil";

const keyState = atom({
  key: "keyState", // unique ID (with respect to other atoms/selectors)
  default: "",
});

export default keyState;
