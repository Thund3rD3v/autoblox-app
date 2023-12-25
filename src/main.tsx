import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { MantineProvider } from "@mantine/core";
import "@/index.css";
import TitleBar from "@/components/TitleBar";
import App from "@/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        colors: {
          brand: [
            "#fbdddd",
            "#f9cccc",
            "#f7bbbb",
            "#f5aaaa",
            "#f29899",
            "#f08788",
            "#ee7677",
            "#ec6566",
            "#EA5455",
            "#d34c4d",
          ],
        },
        primaryColor: "brand",
      }}>
      <TitleBar />
      <App />
    </MantineProvider>
  </RecoilRoot>
);
