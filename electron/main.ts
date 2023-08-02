import {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  shell,
  dialog,
} from "electron";
import path from "node:path";
import fetch from "node-fetch";

import Cashier from "./bloxburg/Cashier";
import config from "./config";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mouse } = require("@nut-tree/nut-js");

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
let cashier: Cashier | null;

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join("autoblox.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    height: 400,
    width: 650,
    resizable: false,
    frame: false,

    titleBarStyle: "hidden",
    autoHideMenuBar: true,
  });

  cashier = new Cashier(win);

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// ------------
// START
// ------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ipcMain.on("start", (_, key: string, name: string, data: any) => {
  if (win && cashier) {
    switch (name) {
      case "bloxburg/cashier":
        cashier.start(key, data);
        break;
    }
  }
});

ipcMain.on("stop", (_, name: string) => {
  if (win && cashier) {
    switch (name) {
      case "bloxburg/cashier":
        cashier.stop();
        break;
    }
  }
});

ipcMain.on("handleGetKey", () => {
  shell.openExternal(`${config.website}/getkey`);
});

ipcMain.on("showError", (_, title: string, message: string) => {
  dialog.showErrorBox(title, message);
});

ipcMain.on("app/close", () => {
  app.quit();
});

ipcMain.handle("getPosition", async () => {
  const pos = await new Promise((res) => {
    globalShortcut.register("F", async () => {
      res(await mouse.getPosition());
      globalShortcut.unregister("F");
    });
  });

  return pos;
});

ipcMain.handle("validateKey", async (_, key: string) => {
  try {
    const res = await fetch(`${config.website}/validatekey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: key,
      }),
    });

    const data: any = await res.json();

    if (data.success === true) {
      return true;
    }

    dialog.showErrorBox(
      "Invalid Key",
      "Invalid Key Provided, Get a Key From autoblox.xyz/getkey"
    );
    return false;
  } catch (err) {
    dialog.showErrorBox(
      "Internal Server Error",
      "Uh Oh, There Was a Internal Server Error, Join Our Discord https://discord.gg/2qu8bh3x9y For Support"
    );
    console.error(err);
    return false;
  }
});

ipcMain.handle("app/getVersion", () => {
  return app.getVersion();
});

// ------------
// END
// ------------

app.on("window-all-closed", () => {
  win = null;
  app.quit();
});

app.whenReady().then(() => {
  createWindow();
});
