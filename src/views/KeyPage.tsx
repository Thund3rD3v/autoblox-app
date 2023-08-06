import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetRecoilState } from "recoil";
import keyState from "@/states/keyState";
import tabState from "@/states/tabState";
import Layout from "@/components/Layout";
import { useState } from "react";

// Assets
import LogoSvg from "@/assets/logo.svg";

export default function Keypage() {
  const setGlobalKey = useSetRecoilState(keyState);
  const setTab = useSetRecoilState(tabState);

  const [key, setKey] = useState("");

  return (
    <Layout>
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          const res = await api.validateKey(key);
          if (res === true) {
            setGlobalKey(key);
            setTab("dashboard");
          }
        }}
        className="px-32 py-12 text-center">
        <img className="mx-auto" width={240} src={LogoSvg} alt="logo" />
        <Input
          className="mt-6"
          placeholder="key"
          value={key}
          onChange={(ev) => {
            setKey(ev.target.value);
          }}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              api.handleGetKey();
            }}
            type="button"
            className="mt-2 w-full"
            variant="outline">
            Get Key
          </Button>
          <Button type="submit" className="mt-2 w-full">
            Continue
          </Button>
        </div>
      </form>
    </Layout>
  );
}
