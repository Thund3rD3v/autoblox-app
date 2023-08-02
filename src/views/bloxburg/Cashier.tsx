import { useEffect, useState } from "react";
import { IBloxburgCashier } from "Interfaces";
import PositionCard from "@/components/PositionCard";
import { Button } from "@/components/ui/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import tabState from "@/states/tabState";
import Layout from "@/components/Layout";

import TOP_LEFT from "@/assets/bloxburg/cashier/top-left.png";
import BOTTOM_RIGHT from "@/assets/bloxburg/cashier/bottom-right.png";
import BURGER1 from "@/assets/bloxburg/cashier/burger1.png";
import BURGER2 from "@/assets/bloxburg/cashier/burger2.png";
import BURGER3 from "@/assets/bloxburg/cashier/burger3.png";
import FRIES from "@/assets/bloxburg/cashier/fries.png";
import SODA from "@/assets/bloxburg/cashier/soda.png";
import DONE from "@/assets/bloxburg/cashier/done.png";
import keyState from "@/states/keyState";

export default function CashierPage() {
  const key = useRecoilValue(keyState);

  const [positions, setPositions] = useState<IBloxburgCashier>({
    topLeft: { status: "unset", position: { x: 0, y: 0 } },
    bottomRight: { status: "unset", position: { x: 0, y: 0 } },
    burger1: { status: "unset", position: { x: 0, y: 0 } },
    burger2: { status: "unset", position: { x: 0, y: 0 } },
    burger3: { status: "unset", position: { x: 0, y: 0 } },
    soda: { status: "unset", position: { x: 0, y: 0 } },
    fries: { status: "unset", position: { x: 0, y: 0 } },
    done: { status: "unset", position: { x: 0, y: 0 } },
  });
  const [started, setStarted] = useState(false);

  const setTab = useSetRecoilState(tabState);

  useEffect(() => {
    api.onStart((name) => {
      if (name === "bloxburg/cashier") {
        setStarted(true);
      }
    });

    api.onStop((name) => {
      if (name === "bloxburg/cashier") {
        setStarted(false);
      }
    });
  }, []);

  function handleReset() {
    setPositions({
      topLeft: { status: "unset", position: { x: 0, y: 0 } },
      bottomRight: { status: "unset", position: { x: 0, y: 0 } },
      burger1: { status: "unset", position: { x: 0, y: 0 } },
      burger2: { status: "unset", position: { x: 0, y: 0 } },
      burger3: { status: "unset", position: { x: 0, y: 0 } },
      soda: { status: "unset", position: { x: 0, y: 0 } },
      fries: { status: "unset", position: { x: 0, y: 0 } },
      done: { status: "unset", position: { x: 0, y: 0 } },
    });
  }

  async function handleStart() {
    const complete = Object.keys(positions).every((key) => {
      const value = positions[key as keyof IBloxburgCashier]; // Use type assertion to get the correct value type.
      if (value.status != "set") {
        return false;
      }

      return true;
    });

    if (complete) {
      api.startAutomation(key, "bloxburg/cashier", positions);
    } else {
      api.showError(
        "Incomplete Item Positions",
        "You have not provided positions for all the items. Please make sure to specify the positions for each item in order to start."
      );
    }
  }

  async function handleStop() {
    api.stopAutomation("bloxburg/cashier");
  }

  return (
    <Layout>
      <div className="px-12 pt-2 pb-6">
        {!started && (
          <button
            onClick={() => {
              setTab("dashboard");
            }}
            className="mb-2 cursor-pointer text-zinc-300 font-medium underline">
            Back
          </button>
        )}

        <div className="grid grid-cols-4 gap-4  text-center">
          <PositionCard
            identifier="topLeft"
            image={TOP_LEFT}
            positions={positions}
            setPositions={setPositions}
          />
          <PositionCard
            identifier="bottomRight"
            image={BOTTOM_RIGHT}
            positions={positions}
            setPositions={setPositions}
          />
          <PositionCard
            identifier="burger1"
            image={BURGER1}
            positions={positions}
            setPositions={setPositions}
          />
          <PositionCard
            identifier="burger2"
            image={BURGER2}
            positions={positions}
            setPositions={setPositions}
          />
          <PositionCard
            identifier="burger3"
            image={BURGER3}
            positions={positions}
            setPositions={setPositions}
          />
          <PositionCard
            identifier="soda"
            image={SODA}
            positions={positions}
            setPositions={setPositions}
          />
          <PositionCard
            identifier="fries"
            image={FRIES}
            positions={positions}
            setPositions={setPositions}
          />
          <PositionCard
            identifier="done"
            image={DONE}
            positions={positions}
            setPositions={setPositions}
          />
        </div>
        <div className="mt-8 flex items-center gap-2">
          {!started ? (
            <Button onClick={handleStart} className="w-full">
              Start
            </Button>
          ) : (
            <Button onClick={handleStop} variant="outline" className="w-full">
              Stop
            </Button>
          )}

          {!started && (
            <Button onClick={handleReset} className="w-full" variant="outline">
              Reset
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
