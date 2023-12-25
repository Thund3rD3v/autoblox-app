import { app, BrowserWindow, globalShortcut } from "electron";
import { IBloxburgCashier } from "Interfaces";
import config from "../config";
import path from "node:path";
import fs from "fs";
import log from "electron-log";

const {
  mouse,
  Button,
  straightTo,
  Region,
  screen,
  FileType,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("@nut-tree/nut-js");

class Cashier {
  private started = false;
  win;
  overlay;

  constructor(win: BrowserWindow, overlay: BrowserWindow) {
    this.win = win;
    this.overlay = overlay;
  }

  async start(
    key: string,
    data: {
      positions: IBloxburgCashier;
    }
  ) {
    if (!/^\s*$/.test(key)) {
      this.overlay.webContents.send("overlay/update", true);

      globalShortcut.register("F", async () => {
        globalShortcut.unregister("F");
        this.overlay?.webContents.send("overlay/update", false);

        await mouse.click(Button.LEFT);

        // Wait for popup to show
        await new Promise<void>((resolve) => setTimeout(resolve, 500));

        this.started = true;
        this.main(key, data.positions);

        this.win.webContents.send("start", "bloxburg/cashier");

        this.overlay.webContents.send(
          "app/success",
          "Successfully Started Automation"
        );
      });
    } else {
      this.win?.webContents.send("keyExpire");
    }
  }

  async main(key: string, positions: IBloxburgCashier) {
    try {
      while (this.started) {
        // Take Screen Shot Parms: (Left, Right, Width, Height)
        await screen.captureRegion(
          "screen1",
          new Region(
            positions.topLeft.position.x,
            positions.topLeft.position.y,
            positions.bottomRight.position.x - positions.topLeft.position.x,
            positions.bottomRight.position.y - positions.topLeft.position.y
          ),
          FileType.PNG,
          app.getPath("temp")
        );

        await new Promise<void>((resolve) => setTimeout(resolve, 1000 * 5));

        await screen.captureRegion(
          "screen2",
          new Region(
            positions.topLeft.position.x,
            positions.topLeft.position.y,
            positions.bottomRight.position.x - positions.topLeft.position.x,
            positions.bottomRight.position.y - positions.topLeft.position.y
          ),
          FileType.PNG,
          app.getPath("temp")
        );

        await new Promise<void>((resolve) => setTimeout(resolve, 1000 * 2));

        await screen.captureRegion(
          "screen3",
          new Region(
            positions.topLeft.position.x,
            positions.topLeft.position.y,
            positions.bottomRight.position.x - positions.topLeft.position.x,
            positions.bottomRight.position.y - positions.topLeft.position.y
          ),
          FileType.PNG,
          app.getPath("temp")
        );

        // Read Screens
        const screen1Data = fs.readFileSync(
          path.join(app.getPath("temp"), "screen1.png")
        );

        const screen2Data = fs.readFileSync(
          path.join(app.getPath("temp"), "screen2.png")
        );

        const screen3Data = fs.readFileSync(
          path.join(app.getPath("temp"), "screen3.png")
        );

        const body = new FormData();

        const screen1Blob = new Blob([screen1Data], { type: "image/png" });
        const screen2Blob = new Blob([screen2Data], { type: "image/png" });
        const screen3Blob = new Blob([screen3Data], { type: "image/png" });

        body.set("screen1", screen1Blob, "screen1.png");
        body.set("screen2", screen2Blob, "screen2.png");
        body.set("screen3", screen3Blob, "screen3.png");

        const res = await fetch(`${config.website}/bloxburg/cashier`, {
          method: "POST",
          headers: {
            Authorization: key,
          },
          body: body,
        });

        if (res.status === 401) {
          this.win?.webContents.send("keyExpire");
          this.stop();
          break;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await res.json();

        if (!data.success) {
          this.overlay?.webContents.send("app/error", data.message);
          this.stop();
          break;
        }

        const orderData = data.data;

        // Move to burger section
        await mouse.move(straightTo(positions["burger"].position));
        await mouse.click(Button.LEFT);

        await new Promise<void>((resolve) => setTimeout(resolve, 500 * 1));

        await mouse.move(straightTo(positions["bottom"].position));
        await mouse.click(Button.LEFT);

        if ("oni" in orderData) {
          for (let i = 0; i < parseInt(orderData["oni"]); i++) {
            await mouse.move(straightTo(positions["oni"].position));
            await mouse.click(Button.LEFT);
            await new Promise<void>((resolve) => setTimeout(resolve, 250));
          }
        }

        if ("che" in orderData) {
          for (let i = 0; i < parseInt(orderData["che"]); i++) {
            await mouse.move(straightTo(positions["che"].position));
            await mouse.click(Button.LEFT);
            await new Promise<void>((resolve) => setTimeout(resolve, 250));
          }
        }

        if ("bef" in orderData) {
          for (let i = 0; i < parseInt(orderData["bef"]); i++) {
            await mouse.move(straightTo(positions["bef"].position));
            await mouse.click(Button.LEFT);
            await new Promise<void>((resolve) => setTimeout(resolve, 250));
          }
        }

        if ("vef" in orderData) {
          for (let i = 0; i < parseInt(orderData["vef"]); i++) {
            await mouse.move(straightTo(positions["vef"].position));
            await mouse.click(Button.LEFT);
            await new Promise<void>((resolve) => setTimeout(resolve, 250));
          }
        }

        if ("tom" in orderData) {
          for (let i = 0; i < parseInt(orderData["tom"]); i++) {
            await mouse.move(straightTo(positions["tom"].position));
            await mouse.click(Button.LEFT);
            await new Promise<void>((resolve) => setTimeout(resolve, 250));
          }
        }

        if ("let" in orderData) {
          for (let i = 0; i < parseInt(orderData["let"]); i++) {
            await mouse.move(straightTo(positions["let"].position));
            await mouse.click(Button.LEFT);
            await new Promise<void>((resolve) => setTimeout(resolve, 250));
          }
        }

        await mouse.move(straightTo(positions["top"].position));
        await mouse.click(Button.LEFT);

        // Move to sides section
        await mouse.move(straightTo(positions["sides"].position));
        await mouse.click(Button.LEFT);

        await new Promise<void>((resolve) => setTimeout(resolve, 1000 * 1));

        if ("si-fri" in orderData) {
          await mouse.move(straightTo(positions["item1"].position));
          await mouse.click(Button.LEFT);

          if (orderData["si-fri"] == "s") {
            await mouse.move(straightTo(positions["size1"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["si-fri"] == "m") {
            await mouse.move(straightTo(positions["size2"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["si-fri"] == "l") {
            await mouse.move(straightTo(positions["size3"].position));
            await mouse.click(Button.LEFT);
          }
        }

        if ("si-moz" in orderData) {
          await mouse.move(straightTo(positions["item2"].position));
          await mouse.click(Button.LEFT);

          if (orderData["si-moz"] == "s") {
            await mouse.move(straightTo(positions["size1"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["si-moz"] == "m") {
            await mouse.move(straightTo(positions["size2"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["si-moz"] == "l") {
            await mouse.move(straightTo(positions["size3"].position));
            await mouse.click(Button.LEFT);
          }
        }

        if ("si-oni" in orderData) {
          await mouse.move(straightTo(positions["item3"].position));
          await mouse.click(Button.LEFT);

          if (orderData["si-oni"] == "s") {
            await mouse.move(straightTo(positions["size1"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["si-oni"] == "m") {
            await mouse.move(straightTo(positions["size2"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["si-oni"] == "l") {
            await mouse.move(straightTo(positions["size3"].position));
            await mouse.click(Button.LEFT);
          }
        }

        // Move to drinks section
        await mouse.move(straightTo(positions["drinks"].position));
        await mouse.click(Button.LEFT);

        await new Promise<void>((resolve) => setTimeout(resolve, 1000 * 1));

        if ("dr-sod" in orderData) {
          await mouse.move(straightTo(positions["item1"].position));
          await mouse.click(Button.LEFT);

          if (orderData["dr-sod"] == "s") {
            await mouse.move(straightTo(positions["size1"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["dr-sod"] == "m") {
            await mouse.move(straightTo(positions["size2"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["dr-sod"] == "l") {
            await mouse.move(straightTo(positions["size3"].position));
            await mouse.click(Button.LEFT);
          }
        }

        if ("dr-app" in orderData) {
          await mouse.move(straightTo(positions["item2"].position));
          await mouse.click(Button.LEFT);

          if (orderData["dr-app"] == "s") {
            await mouse.move(straightTo(positions["size1"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["dr-app"] == "m") {
            await mouse.move(straightTo(positions["size2"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["dr-app"] == "l") {
            await mouse.move(straightTo(positions["size3"].position));
            await mouse.click(Button.LEFT);
          }
        }

        if ("dr-sha" in orderData) {
          await mouse.move(straightTo(positions["item3"].position));
          await mouse.click(Button.LEFT);

          if (orderData["dr-sha"] == "s") {
            await mouse.move(straightTo(positions["size1"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["dr-sha"] == "m") {
            await mouse.move(straightTo(positions["size2"].position));
            await mouse.click(Button.LEFT);
          }

          if (orderData["dr-sha"] == "l") {
            await mouse.move(straightTo(positions["size3"].position));
            await mouse.click(Button.LEFT);
          }
        }

        // Click Done
        await mouse.move(straightTo(positions["done"].position));
        await mouse.click(Button.LEFT);

        // Wait 4 seconds until completing next order
        await new Promise<void>((resolve) => setTimeout(resolve, 1000 * 3));
      }
    } catch (err) {
      log.error(err);
      this.overlay?.webContents.send("app/error", err);
    }
  }

  stop() {
    this.win.webContents.send("stop", "bloxburg/cashier");
    this.started = false;
  }
}

export default Cashier;
