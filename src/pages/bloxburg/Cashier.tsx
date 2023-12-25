import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { IBloxburgCashier } from "Interfaces";
import ItemCard from "@/components/bloxburg/cashier/ItemCard";
import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";

// Assets
import BLOXBURG_CASHIER_THUMBNAIL from "@/assets/bloxburg/cashier/thumbnail.png";

import TOP_LEFT from "@/assets/bloxburg/cashier/top-left.png";
import BOTTOM_RIGHT from "@/assets/bloxburg/cashier/bottom-right.png";

import TOP from "@/assets/bloxburg/cashier/top.png";
import ONI from "@/assets/bloxburg/cashier/oni.png";
import CHE from "@/assets/bloxburg/cashier/che.png";
import BEF from "@/assets/bloxburg/cashier/bef.png";
import VEF from "@/assets/bloxburg/cashier/vef.png";
import TOM from "@/assets/bloxburg/cashier/tom.png";
import LET from "@/assets/bloxburg/cashier/let.png";
import BOTTOM from "@/assets/bloxburg/cashier/bottom.png";

import BURGER from "@/assets/bloxburg/cashier/burger.svg";
import SIDES from "@/assets/bloxburg/cashier/sides.svg";
import DRINKS from "@/assets/bloxburg/cashier/drinks.svg";

import ITEM1 from "@/assets/bloxburg/cashier/si-fri.png";
import ITEM2 from "@/assets/bloxburg/cashier/si-moz.png";
import ITEM3 from "@/assets/bloxburg/cashier/si-oni.png";

import SIZE1 from "@/assets/bloxburg/cashier/s.svg";
import SIZE2 from "@/assets/bloxburg/cashier/m.svg";
import SIZE3 from "@/assets/bloxburg/cashier/l.svg";

import DONE from "@/assets/bloxburg/cashier/done.png";
import { useRecoilValue } from "recoil";
import keyState from "@/states/keyState";

export default function CashierPage() {
  const key = useRecoilValue(keyState);

  const [started, setStarted] = useState(false);
  const [positions, setPositions] = useState<IBloxburgCashier>({
    topLeft: { status: "unset", position: { x: 0, y: 0 } },
    bottomRight: { status: "unset", position: { x: 0, y: 0 } },
    top: { status: "unset", position: { x: 0, y: 0 } },
    oni: { status: "unset", position: { x: 0, y: 0 } },
    che: { status: "unset", position: { x: 0, y: 0 } },
    bef: { status: "unset", position: { x: 0, y: 0 } },
    vef: { status: "unset", position: { x: 0, y: 0 } },
    tom: { status: "unset", position: { x: 0, y: 0 } },
    let: { status: "unset", position: { x: 0, y: 0 } },
    bottom: { status: "unset", position: { x: 0, y: 0 } },
    burger: { status: "unset", position: { x: 0, y: 0 } },
    sides: { status: "unset", position: { x: 0, y: 0 } },
    drinks: { status: "unset", position: { x: 0, y: 0 } },
    item1: { status: "unset", position: { x: 0, y: 0 } },
    item2: { status: "unset", position: { x: 0, y: 0 } },
    item3: { status: "unset", position: { x: 0, y: 0 } },
    size1: { status: "unset", position: { x: 0, y: 0 } },
    size2: { status: "unset", position: { x: 0, y: 0 } },
    size3: { status: "unset", position: { x: 0, y: 0 } },
    done: { status: "unset", position: { x: 0, y: 0 } },
  });

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

    async function updateSettings() {
      const settings = await api.bloxburg.cashier.getSettings();
      setPositions(settings as IBloxburgCashier);
    }

    updateSettings();
  }, []);

  function handleSave() {
    api.bloxburg.cashier.saveSettings(positions);
  }

  function handleStop() {
    api.stopAutomation("bloxburg/cashier");
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
      api.startAutomation(key, "bloxburg/cashier", {
        positions,
      });
    } else {
      api.app.sendError(
        "Please make sure to specify the positions for each item in order to start."
      );
    }
  }

  return (
    <Layout>
      <Box sx={{ overflow: "auto", height: "345px" }} px="xl" pb="lg" pt="lg">
        <Flex justify="space-between" align="center">
          <Group align="start">
            <Image
              radius="md"
              width={100}
              src={BLOXBURG_CASHIER_THUMBNAIL}
              alt={"bloxburg cashier thumbnail"}
            />
            <Title maw={300} order={3} color="white">
              Bloxburg Cashier Automation
            </Title>
          </Group>
          <Stack spacing="xs" w={76}>
            {!started ? (
              <Button variant="filled" onClick={handleStart}>
                Start
              </Button>
            ) : (
              <Button variant="filled" onClick={handleStop}>
                Stop
              </Button>
            )}
            <Button
              onClick={handleSave}
              variant="subtle"
              color="gray"
              size="xs">
              Save
            </Button>
          </Stack>
        </Flex>
        <SimpleGrid py="sm" mt="1.5rem" cols={5}>
          <ItemCard
            identifier="topLeft"
            positions={positions}
            setPositions={setPositions}
            image={TOP_LEFT}
          />
          <ItemCard
            identifier="bottomRight"
            positions={positions}
            setPositions={setPositions}
            image={BOTTOM_RIGHT}
          />
          <ItemCard
            identifier="top"
            positions={positions}
            setPositions={setPositions}
            image={TOP}
          />
          <ItemCard
            identifier="oni"
            positions={positions}
            setPositions={setPositions}
            image={ONI}
          />
          <ItemCard
            identifier="che"
            positions={positions}
            setPositions={setPositions}
            image={CHE}
          />
          <ItemCard
            identifier="bef"
            positions={positions}
            setPositions={setPositions}
            image={BEF}
          />
          <ItemCard
            identifier="vef"
            positions={positions}
            setPositions={setPositions}
            image={VEF}
          />
          <ItemCard
            identifier="tom"
            positions={positions}
            setPositions={setPositions}
            image={TOM}
          />
          <ItemCard
            identifier="let"
            positions={positions}
            setPositions={setPositions}
            image={LET}
          />
          <ItemCard
            identifier="bottom"
            positions={positions}
            setPositions={setPositions}
            image={BOTTOM}
          />
          <ItemCard
            identifier="burger"
            positions={positions}
            setPositions={setPositions}
            image={BURGER}
          />
          <ItemCard
            identifier="sides"
            positions={positions}
            setPositions={setPositions}
            image={SIDES}
          />
          <ItemCard
            identifier="drinks"
            positions={positions}
            setPositions={setPositions}
            image={DRINKS}
          />
          <ItemCard
            identifier="item1"
            positions={positions}
            setPositions={setPositions}
            image={ITEM1}
          />
          <ItemCard
            identifier="item2"
            positions={positions}
            setPositions={setPositions}
            image={ITEM2}
          />
          <ItemCard
            identifier="item3"
            positions={positions}
            setPositions={setPositions}
            image={ITEM3}
          />
          <ItemCard
            identifier="size1"
            positions={positions}
            setPositions={setPositions}
            image={SIZE1}
          />
          <ItemCard
            identifier="size2"
            positions={positions}
            setPositions={setPositions}
            image={SIZE2}
          />
          <ItemCard
            identifier="size3"
            positions={positions}
            setPositions={setPositions}
            image={SIZE3}
          />
          <ItemCard
            identifier="done"
            positions={positions}
            setPositions={setPositions}
            image={DONE}
          />
        </SimpleGrid>
      </Box>
    </Layout>
  );
}
