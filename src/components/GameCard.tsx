import { useSetRecoilState } from "recoil";
import tabState from "@/states/tabState";

interface Props {
  src: string;
  alt: string;
  tab: string;
}

export default function GameCard({ src, alt, tab }: Props) {
  const setTab = useSetRecoilState(tabState);

  return (
    <button
      onClick={() => {
        setTab(tab);
      }}
      className="hover:opacity-75 transition-opacity duration-500">
      <img className="rounded-lg" src={src} alt={alt} />
    </button>
  );
}
