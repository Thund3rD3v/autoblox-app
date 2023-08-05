declare namespace api {
  function getPosition(): Promise<{ x: number; y: number }>;
  function handleGetKey(): void;
  function validateKey(key: string): Promise<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function startAutomation(key: string, name: string, data: any): void;
  function stopAutomation(name: string): void;

  function onStart(callback: (name: string) => void): void;
  function onStop(callback: (name: string) => void): void;

  function onKeyExpire(callback: () => void): void;

  namespace overlay {
    function onUpdate(callback: (value: string) => void): void;
  }

  namespace app {
    function onError(callback: (message: string) => void): void;
    function getVersion(): Promise<string>;
    function openUrl(url: string): void;
    function close(): void;
  }
}
