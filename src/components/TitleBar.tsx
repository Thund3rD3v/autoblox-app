import { useState, useEffect } from "react";
import { Toggle } from "./ui/toggle";

export default function TitleBar() {
  const [version, setVersion] = useState("1.0.0");

  const [locked, setLocked] = useState(false);

  function handleLock(pressed: boolean) {
    api.app.toggleLock(pressed);
    setLocked(pressed);
  }

  useEffect(() => {
    async function getVersion() {
      setVersion(await api.app.getVersion());
    }

    getVersion();
  }, []);

  return (
    <nav className="fixed flex justify-between items-center w-full px-4 py-2 border-b border-b-zinc-600 bg-neutral-800 z-50">
      <div className="flex items-center gap-2">
        <span className="text-white font-semibold text-sm">
          AutoBlox <small>v{version}</small>
        </span>
        <Toggle size="xs" onPressedChange={handleLock} pressed={locked}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm18 3H3.75v9a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V9zm-15-3.75A.75.75 0 004.5 6v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H5.25zm1.5.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V6zm3-.75A.75.75 0 009 6v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H9.75z"
              clipRule="evenodd"
            />
          </svg>
        </Toggle>
      </div>

      <button
        onClick={() => {
          api.app.close();
        }}
        className="text-zinc-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.85}
          stroke="currentColor"
          className="w-5 h-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>
  );
}
