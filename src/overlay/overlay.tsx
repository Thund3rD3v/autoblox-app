import ReactDOM from "react-dom/client";
import "@/overlay/index.css";
import App from "@/overlay/App";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: "dark",
    }}>
    <Toaster
      toastOptions={{
        style: {
          background: "#141517",
          border: "1px solid #25262b",
          color: "white",
          textAlign: "center",
        },
      }}
      position="bottom-right"
      reverseOrder={false}
    />
    <App />
  </MantineProvider>
);
