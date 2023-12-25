import { Box, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

function App() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    api.app.onError((message) => {
      toast.error(message);
    });

    api.app.onSuccess((message) => {
      toast.success(message);
    });

    api.overlay.onUpdate(setActive);
  }, []);

  if (active) {
    return (
      <Box
        px="xl"
        py="sm"
        sx={(theme) => {
          return {
            background: theme.colors.dark[8],
            border: `1px solid ${theme.colors.dark[4]}`,
            opacity: "95%",
            borderRadius: theme.radius.sm,
          };
        }}>
        <Title sx={{ color: "white", fontSize: "1.25rem" }}>
          Press F To Start
        </Title>
      </Box>
    );
  }
}

export default App;
