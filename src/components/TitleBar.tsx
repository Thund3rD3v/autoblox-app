import {
  ActionIcon,
  Group,
  Switch,
  Text,
  Box,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useState, ChangeEvent } from "react";

import { IconX, IconLock, IconLockOpen } from "@tabler/icons-react";

// Assets
import LogoIconSvg from "@/assets/icon.svg";

export default function TitleBar() {
  const theme = useMantineTheme();

  const [locked, setLocked] = useState(false);

  function handleLock(ev: ChangeEvent<HTMLInputElement>) {
    api.app.toggleLock(ev.target.checked);
    setLocked(ev.target.checked);
  }

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        background: theme.colors.dark[8],
        borderTopRightRadius: theme.radius.md,
        borderTopLeftRadius: theme.radius.md,
        zIndex: 50,
      }}
      px="md"
      py="sm">
      <Group align="center">
        <Flex gap="xs" align="center">
          <img
            width={30}
            style={{ borderRadius: theme.radius.md }}
            src={LogoIconSvg}
            alt="logo"
          />
          <Text size="md" weight={600} color="white">
            AutoBlox
          </Text>
        </Flex>

        <Switch
          size="md"
          onChange={handleLock}
          checked={locked}
          color={"gray"}
          radius="md"
          onLabel={
            <IconLock size="1rem" stroke={2} color={theme.colors.blue[6]} />
          }
          offLabel={
            <IconLockOpen
              size="1rem"
              stroke={2}
              color={theme.colors.green[6]}
            />
          }
        />
      </Group>
      <ActionIcon
        onClick={() => {
          api.app.close();
        }}>
        <IconX size="1.125rem" />
      </ActionIcon>
    </Box>
  );
}
