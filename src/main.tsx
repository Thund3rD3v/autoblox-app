import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "@/App.tsx";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        error: {
          className: "bg-red-500 text-white border-2 border-red-400 text-xs",
          style: { background: "#ef4444", color: "white" },
        },
      }}
    />
  </RecoilRoot>
);
