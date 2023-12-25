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
import log from "electron-log";
import settingsManager from "electron-settings";

import "./discord";
import { IBloxburgCashier } from "Interfaces";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mouse } = require("@nut-tree/nut-js");

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
let overlay: BrowserWindow | null;
let cashier: Cashier | null;

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join("autoblox.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: true,
    },
    height: 400,
    width: 650,
    resizable: false,
    transparent: true,
    frame: false,

    titleBarStyle: "hidden",
    autoHideMenuBar: true,
  });

  // Disable Refreshing
  //win.removeMenu();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

function createOverlay() {
  overlay = new BrowserWindow({
    frame: false,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
    transparent: true,
    alwaysOnTop: true,
    fullscreen: true,
  });

  overlay.setFocusable(false);
  overlay.setIgnoreMouseEvents(true);

  if (VITE_DEV_SERVER_URL) {
    overlay.loadURL(VITE_DEV_SERVER_URL + "overlay/");
  } else {
    // win.loadFile('dist/index.html')
    overlay.loadFile(path.join(process.env.DIST, "overlay/index.html"));
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
  shell.openExternal(`${config.website}/key`);
});

ipcMain.on("app/openUrl", (_, url: string) => {
  shell.openExternal(url);
});

ipcMain.on("app/close", () => {
  app.quit();
});

ipcMain.on("app/sendError", (_, message: string) => {
  overlay?.webContents.send("app/error", message);
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
    const res = await fetch(`${config.website}/validate-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await res.json();

    if (data.success === true) {
      return true;
    }

    overlay?.webContents.send(
      "app/error",
      "Invalid Key Provided, Get a Key From autoblox.xyz/key"
    );

    return false;
  } catch (err) {
    log.error(err);
    overlay?.webContents.send(
      "app/error",
      "Oops! Something went wrong. Please try again later"
    );
    return false;
  }
});

ipcMain.handle("app/getVersion", () => {
  return app.getVersion();
});

ipcMain.on("app/toggleLock", (_, value: boolean) => {
  if (win) {
    win.setVisibleOnAllWorkspaces(value);
    win.setAlwaysOnTop(value, "normal");
  }
});

// Settings
ipcMain.handle("bloxburg/cashier/getSettings", async () => {
  const settings = await settingsManager.get("bloxburg.cashier");
  if (settings) {
    return settings;
  }

  await settingsManager.set("bloxburg", {
    cashier: {
      topLeft: { status: "unset", position: { x: 0, y: 0 } },
      bottomRight: { status: "unset", position: { x: 0, y: 0 } },
      top: { status: "unset", position: { x: 0, y: 0 } },
      oni: { status: "unset", position: { x: 0, y: 0 } },
      che: { status: "unset", position: { x: 0, y: 0 } },
      bef: { status: "unset", position: { x: 0, y: 0 } },
      vef: { status: "unset", position: { x: 0, y: 0 } },
      tom: { status: "unset", position: { x: 0, y: 0 } },
      let: { status: "unset", position: { x: 0, y: 0 } },
      bottom: { status: "unset", position: { x: 0, y: 0 } },
      burger: { status: "unset", position: { x: 0, y: 0 } },
      sides: { status: "unset", position: { x: 0, y: 0 } },
      drinks: { status: "unset", position: { x: 0, y: 0 } },
      item1: { status: "unset", position: { x: 0, y: 0 } },
      item2: { status: "unset", position: { x: 0, y: 0 } },
      item3: { status: "unset", position: { x: 0, y: 0 } },
      size1: { status: "unset", position: { x: 0, y: 0 } },
      size2: { status: "unset", position: { x: 0, y: 0 } },
      size3: { status: "unset", position: { x: 0, y: 0 } },
      done: { status: "unset", position: { x: 0, y: 0 } },
    },
  });

  return {
    topLeft: { status: "unset", position: { x: 0, y: 0 } },
    bottomRight: { status: "unset", position: { x: 0, y: 0 } },
    top: { status: "unset", position: { x: 0, y: 0 } },
    oni: { status: "unset", position: { x: 0, y: 0 } },
    che: { status: "unset", position: { x: 0, y: 0 } },
    bef: { status: "unset", position: { x: 0, y: 0 } },
    vef: { status: "unset", position: { x: 0, y: 0 } },
    tom: { status: "unset", position: { x: 0, y: 0 } },
    let: { status: "unset", position: { x: 0, y: 0 } },
    bottom: { status: "unset", position: { x: 0, y: 0 } },
    burger: { status: "unset", position: { x: 0, y: 0 } },
    sides: { status: "unset", position: { x: 0, y: 0 } },
    drinks: { status: "unset", position: { x: 0, y: 0 } },
    item1: { status: "unset", position: { x: 0, y: 0 } },
    item2: { status: "unset", position: { x: 0, y: 0 } },
    item3: { status: "unset", position: { x: 0, y: 0 } },
    size1: { status: "unset", position: { x: 0, y: 0 } },
    size2: { status: "unset", position: { x: 0, y: 0 } },
    size3: { status: "unset", position: { x: 0, y: 0 } },
    done: { status: "unset", position: { x: 0, y: 0 } },
  };
});

ipcMain.on(
  "bloxburg/cashier/saveSettings",
  async (_, settings: IBloxburgCashier) => {
    await settingsManager.set("bloxburg", {
      cashier: settings as never,
    });

    overlay?.webContents.send("app/success", "Successfully Saved");
  }
);

// ------------
// IPC END
// ------------

app.on("window-all-closed", () => {
  win = null;
  app.quit();
});

// Handle Error
process.on("uncaughtException", (error) => {
  log.error("Exception:", error);

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
    // updating (DONT CHANGE TO checkForUpdatesAndNotify)
    autoUpdater.checkForUpdates();

    createWindow();
    createOverlay();

    if (win && overlay) {
      cashier = new Cashier(win, overlay);
    }
  });
}
