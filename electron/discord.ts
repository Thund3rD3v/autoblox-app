import { Client, register } from "discord-rpc";

const RPC = new Client({ transport: "ipc" });
const START_TIME = Date.now();

register("1132688800963907664");

async function activity() {
  if (!RPC) return;

  RPC.setActivity({
    state:
      process.env.NODE_ENV === "development"
        ? "Developing new features..."
        : "Farming away...",
    startTimestamp: START_TIME,
    largeImageKey: "https://autoblox.xyz/android-chrome-512x512.png",
    largeImageText:
      "Autoblox" + (process.env.NODE_ENV === "development" ? "-dev" : ""),
    instance: true,
    buttons: [
      {
        label: "Start Now",
        url: "https://autoblox.xyz",
      },
    ],
  });
}

RPC.on("ready", activity);

RPC.login({ clientId: "1132688800963907664" });
