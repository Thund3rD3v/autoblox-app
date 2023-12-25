import GameCard from "@/components/GameCard";
import Layout from "@/components/Layout";

import { Box, SimpleGrid, Text } from "@mantine/core";

// Assets
import BLOXBURG_CASHIER_THUMBNAIL from "@/assets/bloxburg/cashier/thumbnail.png";

function DashboardPage() {
  return (
    <Layout>
      <Box pt="md" px="2rem" sx={{ textAlign: "center" }}>
        <SimpleGrid cols={4} spacing="lg" verticalSpacing="lg">
          <GameCard
            src={BLOXBURG_CASHIER_THUMBNAIL}
            alt="bloxburg delivery"
            tab="bloxburg/cashier"
          />
          <Box
            sx={(theme) => ({
              width: 125,
              height: 125,
              display: "flex",
              background: theme.colors.dark[6],
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              ":hover": {
                opacity: "90%",
              },
            })}>
            <Text
              sx={(theme) => ({
                color: theme.colors.dark[2],
              })}
              fw="bold"
              fz="lg">
              Comming Soon. . .
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              width: 125,
              height: 125,
              display: "flex",
              background: theme.colors.dark[6],
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              ":hover": {
                opacity: "90%",
              },
            })}>
            <Text
              sx={(theme) => ({
                color: theme.colors.dark[2],
              })}
              fw="bold"
              fz="lg">
              Comming Soon. . .
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              width: 125,
              height: 125,
              display: "flex",
              background: theme.colors.dark[6],
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              ":hover": {
                opacity: "90%",
              },
            })}>
            <Text
              sx={(theme) => ({
                color: theme.colors.dark[2],
              })}
              fw="bold"
              fz="lg">
              Comming Soon. . .
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              width: 125,
              height: 125,
              display: "flex",
              background: theme.colors.dark[6],
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              ":hover": {
                opacity: "90%",
              },
            })}>
            <Text
              sx={(theme) => ({
                color: theme.colors.dark[2],
              })}
              fw="bold"
              fz="lg">
              Comming Soon. . .
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              width: 125,
              height: 125,
              display: "flex",
              background: theme.colors.dark[6],
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              ":hover": {
                opacity: "90%",
              },
            })}>
            <Text
              sx={(theme) => ({
                color: theme.colors.dark[2],
              })}
              fw="bold"
              fz="lg">
              Comming Soon. . .
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              width: 125,
              height: 125,
              display: "flex",
              background: theme.colors.dark[6],
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              ":hover": {
                opacity: "90%",
              },
            })}>
            <Text
              sx={(theme) => ({
                color: theme.colors.dark[2],
              })}
              fw="bold"
              fz="lg">
              Comming Soon. . .
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              width: 125,
              height: 125,
              display: "flex",
              background: theme.colors.dark[6],
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: theme.radius.md,
              ":hover": {
                opacity: "90%",
              },
            })}>
            <Text
              sx={(theme) => ({
                color: theme.colors.dark[2],
              })}
              fw="bold"
              fz="lg">
              Comming Soon. . .
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Layout>
  );
}

export default DashboardPage;
