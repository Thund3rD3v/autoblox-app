import {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  shell,
  dialog,
} from "electron";
import { autoUpdater } from "electron-updater";
import Cashier from "./bloxburg/Cashier";
import fetch from "node-fetch";
import config from "./config";
import path from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mouse } = require("@nut-tree/nut-js");

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
      devTools: false,
    },
    height: 400,
    width: 650,
    resizable: false,
    frame: false,

    titleBarStyle: "hidden",
    autoHideMenuBar: true,
  });

  cashier = new Cashier(win);

  // Disable Refreshing
  win.removeMenu();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// ------------
// IPC START
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

ipcMain.on("app/openUrl", (_, url: string) => {
  shell.openExternal(url);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await res.json();

    if (data.success === true) {
      return true;
    }

    win?.webContents.send(
      "app/error",
      "Invalid Key Provided, Get a Key From autoblox.xyz/getkey"
    );

    return false;
  } catch (err) {
    win?.webContents.send(
      "app/error",
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
// IPC END
// ------------

app.on("window-all-closed", () => {
  win = null;
  app.quit();
});

// Handle Error
process.on("uncaughtException", (error) => {
  console.error("Exception:", error);

  dialog.showErrorBox("Unexpected Error", error.message);
  app.exit(1);
});

autoUpdater.on("update-downloaded", (info) => {
  if (win) {
    dialog
      .showMessageBox(win, {
        type: "info",
        title: "Application Update",
        message:
          process.platform === "win32"
            ? (info.releaseNotes as string)
            : (info.releaseName as string),
        detail:
          "A new version has been downloaded. The application will be restarted after closing this window.",
      })
      .then(() => {
        autoUpdater.quitAndInstall();
      });
  }
});

// Only Allow 1 Instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(() => {
    createWindow();

    // updating (DONT CHANGE TO checkForUpdatesAndNotify)
    autoUpdater.checkForUpdates();
  });
}
