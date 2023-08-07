import { useRecoilState, useSetRecoilState } from "recoil";
import CashierPage from "@/views/bloxburg/Cashier";
import DashboardPage from "@/views/DashboardPage";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import tabState from "@/states/tabState";
import keyState from "./states/keyState";
import { toast } from "react-hot-toast";
import Keypage from "@/views/KeyPage";

function App() {
  const [currentTab, setCurrentTab] = useRecoilState(tabState);
  const setKey = useSetRecoilState(keyState);

  useEffect(() => {
    api.app.onError((message) => {
      toast.error(message);
    });

    api.onKeyExpire(() => {
      toast.error("Your Key Has Expired, Get a Key From autoblox.xyz/getkey");
      setKey("");
      setCurrentTab("key");
    });

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
      </main>
    </AnimatePresence>
  );
}

export default App;
