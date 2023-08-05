import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TooltipProvider>
    <RecoilRoot>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          error: {
            className: "bg-red-500 text-white border-2 border-red-400 text-xs",
          },
        }}
      />
    </RecoilRoot>
  </TooltipProvider>
);
