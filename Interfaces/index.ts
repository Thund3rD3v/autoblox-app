export interface IBloxburgCashier {
  topLeft: {
    status: "unset" | "setting" | "set";
    position: { x: number; y: number };
  };
  bottomRight: {
    status: "unset" | "setting" | "set";
    position: { x: number; y: number };
  };
  burger1: {
    status: "unset" | "setting" | "set";
    position: { x: number; y: number };
  };
  burger2: {
    status: "unset" | "setting" | "set";
    position: { x: number; y: number };
  };
  burger3: {
    status: "unset" | "setting" | "set";
    position: { x: number; y: number };
  };
  soda: {
    status: "unset" | "setting" | "set";
    position: { x: number; y: number };
  };
  fries: {
    status: "unset" | "setting" | "set";
    position: { x: number; y: number };
  };
  done: {
    status: "unset" | "setting" | "set";
    position: { x: number; y: number };
  };
}
