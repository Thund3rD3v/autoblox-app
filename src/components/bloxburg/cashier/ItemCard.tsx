import { UnstyledButton, Image, Box, Text } from "@mantine/core";
import { IBloxburgCashier } from "Interfaces";

interface Props {
  image: string;
  identifier: keyof IBloxburgCashier;
  positions: IBloxburgCashier;
  setPositions: React.Dispatch<React.SetStateAction<IBloxburgCashier>>;
}

export default function ItemCard({
  image,
  identifier,
  positions,
  setPositions,
}: Props) {
  async function handleSetPosition() {
    for (const position of Object.values(positions)) {
      if (position.status == "setting") {
        return;
      }
    }

    setPositions({
      ...positions,
      [identifier]: {
        ...positions[identifier],
        status: "setting",
      },
    });

    const position = await api.getPosition();
    setPositions({
      ...positions,
      [identifier]: {
        ...positions[identifier],
        status: "set",
        position,
      },
    });
  }

  function handleResetPosition() {
    setPositions({
      ...positions,
      [identifier]: {
        ...positions[identifier],
        status: "unset",
        position: { x: 0, y: 0 },
      },
    });
  }

  if (positions[identifier].status === "set") {
    return (
      <UnstyledButton
        onClick={handleResetPosition}
        p="xl"
        sx={(theme) => {
          return {
            position: "relative",
            border: `2px solid ${theme.colors.dark[6]}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.radius.md,
            height: "100px",
          };
        }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            ":hover": {
              background: "rgba(0,0,0, 0.15)",
            },
            zIndex: 10,
          }}
        />
        <Text align="center" size="xs" weight="bold">
          {`X:${positions[identifier].position.x} Y:${positions[identifier].position.y}`}
        </Text>
      </UnstyledButton>
    );
  }

  if (positions[identifier].status === "setting") {
    return (
      <UnstyledButton
        onClick={handleResetPosition}
        p="xl"
        sx={(theme) => {
          return {
            position: "relative",
            border: `2px solid ${theme.colors.dark[6]}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.radius.md,
            height: "100px",
          };
        }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            ":hover": {
              background: "rgba(0,0,0, 0.15)",
            },
            zIndex: 10,
          }}
        />
        <Text align="center" size="xs" weight="bold">
          Press F At Position
        </Text>
      </UnstyledButton>
    );
  }

  return (
    <UnstyledButton
      onClick={handleSetPosition}
      p="xl"
      sx={(theme) => {
        return {
          position: "relative",
          border: `2px solid ${theme.colors.dark[6]}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: theme.radius.md,
          height: "100px",
        };
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          ":hover": {
            background: "rgba(0,0,0, 0.15)",
          },
          zIndex: 10,
        }}
      />
      <Image width={50} src={image} />
    </UnstyledButton>
  );
}
