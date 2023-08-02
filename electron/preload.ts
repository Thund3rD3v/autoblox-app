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

  showError: (title: string, message: string) =>
    ipcRenderer.send("showError", title, message),

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
    onUpdate: (callback: (value: string) => void) => {
      ipcRenderer.on("overlay/update", (_event, value) => {
        callback(value);
      });
    },
  },

  app: {
    getVersion: () => ipcRenderer.invoke("app/getVersion"),
    close: () => ipcRenderer.send("app/close"),
  },
});
