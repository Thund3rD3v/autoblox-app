import {
  ActionIcon,
  Anchor,
  Box,
  Center,
  Flex,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import keyState from "@/states/keyState";
import tabState from "@/states/tabState";
import Layout from "@/components/Layout";

// Assets
import LogoSvg from "@/assets/logo.svg";
import DiscordSvg from "@/assets/discord_icon.svg";
import { IconArrowRight } from "@tabler/icons-react";

export default function Keypage() {
  const setGlobalKey = useSetRecoilState(keyState);
  const setTab = useSetRecoilState(tabState);

  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState("");

  async function handleSumbit(ev: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    ev.preventDefault();
    const res = await api.validateKey(key);
    if (res === true) {
      setGlobalKey(key);
      setTab("dashboard");
    }

    setIsLoading(false);
  }

  return (
    <Layout>
      <Box component="form" onSubmit={handleSumbit} px="8rem" pt="3rem">
        <Center>
          <img width={220} src={LogoSvg} alt="logo" />
        </Center>
        <Flex mt="2rem" w="100%" gap="xs">
          <div style={{ width: "100%" }}>
            <TextInput
              w="100%"
              placeholder="Enter your key here"
              value={key}
              onChange={(ev) => {
                setKey(ev.target.value);
              }}
            />
          </div>

          <ActionIcon
            type="submit"
            size="lg"
            variant="gradient"
            loading={isLoading}
            loaderProps={{ size: "xs" }}
            gradient={{ from: "brand", to: "red" }}>
            <IconArrowRight size="1.25rem" />
          </ActionIcon>
        </Flex>
        <Anchor
          onClick={() => {
            api.handleGetKey();
          }}
          mt="4px"
          size="xs"
          color="dimmed">
          Get Key
        </Anchor>
        <UnstyledButton
          onClick={() => {
            api.app.openUrl("https://discord.gg/2qu8bh3x9y");
          }}
          my="sm"
          w="100%">
          <Flex
            sx={(theme) => ({
              minHeight: 45,
              borderRadius: "0.5rem",
              backgroundImage: theme.fn.gradient({
                from: theme.colors["indigo"][4],
                to: theme.colors["indigo"][9],
                deg: 45,
              }),
            })}
            justify="center"
            gap="lg"
            align="center">
            <img width={25} src={DiscordSvg} alt="discord-icon" />
            <Text tt="uppercase" size="md" weight={650} color="white">
              Join Our Discord!
            </Text>
          </Flex>
        </UnstyledButton>
      </Box>
    </Layout>
  );
}
