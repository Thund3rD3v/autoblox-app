import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TooltipProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </TooltipProvider>
);
