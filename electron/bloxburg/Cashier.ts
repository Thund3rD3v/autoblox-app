import { BrowserWindow, app, dialog } from "electron";
import fs from "fs";
import path from "node:path";
import fetch from "node-fetch";

import { IBloxburgCashier } from "Interfaces";
import config from "../config";

const {
  mouse,
  Button,
  straightTo,
  Region,
  screen,
  FileType,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@nut-tree/nut-js");

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

class Cashier {
  private overlay: BrowserWindow | null = null;
  private started = false;
  win;

  constructor(win: BrowserWindow) {
    this.win = win;
  }

  async start(
    key: string,
    data: {
      positions: IBloxburgCashier;
      chanceOfMistake: number;
    }
  ) {
    if (!/^\s*$/.test(key)) {
      if (this.overlay === null) {
        this.overlay = new BrowserWindow({
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

        this.overlay.setFocusable(false);
        this.overlay.setIgnoreMouseEvents(true);

        if (VITE_DEV_SERVER_URL) {
          this.overlay.loadURL(VITE_DEV_SERVER_URL + "overlay/");
        } else {
          // win.loadFile('dist/index.html')
          this.overlay.loadFile(
            path.join(process.env.DIST, "overlay/index.html")
          );
        }

        this.overlay.webContents.once("dom-ready", async () => {
          let num = 3;

          // eslint-disable-next-line no-constant-condition
          while (num >= 1) {
            this.overlay?.webContents.send("overlay/update", num);
            num--;
            await new Promise<void>((resolve) => setTimeout(resolve, 1000));
          }

          // run final animation
          this.overlay?.webContents.send("overlay/update", num);
          await new Promise<void>((resolve) => setTimeout(resolve, 250));

          this.overlay?.close();
          this.overlay = null;

          this.started = true;
          this.main(key, data.positions, data.chanceOfMistake);
          this.win.webContents.send("start", "bloxburg/cashier");
        });
      }
    } else {
      this.win?.webContents.send("keyExpire");
    }
  }

  async main(
    key: string,
    positions: IBloxburgCashier,
    chanceOfMistake: number
  ) {
    try {
      while (this.started) {
        if (chanceOfMistake / 100 >= Math.random()) {
          await mouse.move(straightTo(positions["fries"].position));
          await mouse.click(Button.LEFT);
        } else {
          // Take Screen Shot Parms: (Left, Right, Width, Height)
          await screen.captureRegion(
            "autoblox-screen",
            new Region(
              positions.topLeft.position.x,
              positions.topLeft.position.y,
              positions.bottomRight.position.x - positions.topLeft.position.x,
              positions.bottomRight.position.y - positions.topLeft.position.y
            ),
            FileType.PNG,
            app.getPath("temp")
          );

          // Read Screen Shot
          const bufferData = await fs.readFileSync(
            path.join(app.getPath("temp"), "autoblox-screen.png")
          );

          const body = new FormData();
          const blob = new Blob([bufferData]);
          body.set("key", key);
          body.set("image", blob, "image.png");

          const res = await fetch(`${config.website}/bloxburg/cashier`, {
            method: "POST",
            body,
          });

          if (res.status === 401) {
            this.win?.webContents.send("keyExpire");
            this.stop();
            break;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = await res.json();

          const orders: (keyof IBloxburgCashier)[] = data.data;

          for (const order of orders) {
            await mouse.move(straightTo(positions[order].position));
            await mouse.click(Button.LEFT);
          }

          await mouse.move(straightTo(positions["done"].position));
          await mouse.click(Button.LEFT);
        }

        await mouse.move(straightTo(positions["done"].position));
        await mouse.click(Button.LEFT);

        // Wait 4 seconds until completing next order
        await new Promise<void>((resolve) => setTimeout(resolve, 1000 * 4));
      }
    } catch (err) {
      this.stop();
      console.error(err);
      dialog.showErrorBox(
        "Internal Server Error",
        "Uh Oh, There Was a Internal Server Error, Join Our Discord https://discord.gg/2qu8bh3x9y For Support"
      );
    }
  }

  stop() {
    this.win.webContents.send("stop", "bloxburg/cashier");
    this.started = false;
  }
}

export default Cashier;
