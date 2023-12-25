import { IBloxburgCashier } from "Interfaces";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getPosition: () => ipcRenderer.invoke("getPosition"),
  handleGetKey: () => ipcRenderer.send("handleGetKey"),
  validateKey: (key: string): Promise<boolean> =>
    ipcRenderer.invoke("validateKey", key),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startAutomation: (key: string, name: string, data: any) =>
    ipcRenderer.send("start", key, name, data),

  stopAutomation: (name: string) => ipcRenderer.send("stop", name),

  onStart: (callback: (name: string) => void) => {
    ipcRenderer.on("start", (_event, name) => {
      callback(name);
    });
  },

  onStop: (callback: (name: string) => void) => {
    ipcRenderer.on("stop", (_event, name) => {
      callback(name);
    });
  },

  onKeyExpire: (callback: () => void) => {
    ipcRenderer.on("keyExpire", () => {
      callback();
    });
  },

  overlay: {
    onUpdate: (callback: (value: boolean) => void) => {
      ipcRenderer.on("overlay/update", (_event, value) => {
        console.log(value);
        callback(value);
      });
    },
  },

  app: {
    getVersion: () => ipcRenderer.invoke("app/getVersion"),

    onError: (callback: (message: string) => void) => {
      ipcRenderer.on("app/error", (_event, message) => {
        callback(message);
      });
    },

    onSuccess: (callback: (message: string) => void) => {
      ipcRenderer.on("app/success", (_event, message) => {
        callback(message);
      });
    },

    sendError: (message: string) => ipcRenderer.send("app/sendError", message),

    openUrl: (url: string) => ipcRenderer.send("app/openUrl", url),
    toggleLock: (value: boolean) => ipcRenderer.send("app/toggleLock", value),
    close: () => ipcRenderer.send("app/close"),
  },

  bloxburg: {
    cashier: {
      getSettings: () => ipcRenderer.invoke("bloxburg/cashier/getSettings"),
      saveSettings: (settings: IBloxburgCashier) =>
        ipcRenderer.send("bloxburg/cashier/saveSettings", settings),
    },
  },
});
