import { useRecoilValue } from "recoil";
import CashierPage from "@/pages/bloxburg/Cashier";
import DashboardPage from "@/pages/DashboardPage";
import Keypage from "@/pages/KeyPage";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import tabState from "@/states/tabState";
import { Text } from "@mantine/core";

function App() {
  const currentTab = useRecoilValue(tabState);
  const [version, setVersion] = useState("2.0.0");

  useEffect(() => {
    api.onKeyExpire(() => {
      api.app.sendError(
        "Your Key Has Expired, Get a Key From autoblox.xyz/getkey"
      );
    });

    async function getVersion() {
      setVersion(await api.app.getVersion());
    }

    getVersion();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence mode="wait">
      <main key={currentTab} className="pt-12 h-screen overflow-y-auto">
        {(() => {
          switch (currentTab) {
            case "key":
              return <Keypage />;
              break;
            case "dashboard":
              return <DashboardPage />;
              break;
            case "bloxburg/cashier":
              return <CashierPage />;
          }
        })()}
        <Text
          size="xs"
          weight={600}
          color="dimmed"
          sx={{ position: "absolute", right: 16, bottom: 10 }}>
          v{version}
        </Text>
      </main>
    </AnimatePresence>
  );
}

export default App;
