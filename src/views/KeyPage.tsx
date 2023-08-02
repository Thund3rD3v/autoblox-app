import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSetRecoilState } from "recoil";
import keyState from "@/states/keyState";
import tabState from "@/states/tabState";
import Layout from "@/components/Layout";

export default function Keypage() {
  const [key, setKey] = useState("");
  const setGlobalKey = useSetRecoilState(keyState);
  const setTab = useSetRecoilState(tabState);

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
        <img className="mx-auto" width={240} src="/logo.svg" alt="logo" />
        <Input
          className="mt-6 bg-zinc-900 border-zinc-700 ring-offset-zinc-700 text-white"
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