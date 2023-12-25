import { useSetRecoilState } from "recoil";
import tabState from "@/states/tabState";
import { UnstyledButton, Image } from "@mantine/core";

interface Props {
  src: string;
  alt: string;
  tab: string;
}

export default function GameCard({ src, alt, tab }: Props) {
  const setTab = useSetRecoilState(tabState);

  return (
    <UnstyledButton
      sx={{
        ":hover": {
          opacity: "90%",
        },
      }}
      onClick={() => {
        setTab(tab);
      }}>
      <Image radius="md" width={125} src={src} alt={alt} />
    </UnstyledButton>
  );
}
