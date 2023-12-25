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
    function onUpdate(callback: (value: boolean) => void): void;
  }

  namespace app {
    function getVersion(): Promise<string>;

    function onError(callback: (message: string) => void): void;
    function onSuccess(callback: (message: string) => void): void;

    function sendError(message: string): void;
    function toggleLock(value: boolean): void;
    function openUrl(url: string): void;
    function close(): void;
  }

  namespace bloxburg {
    namespace cashier {
      function getSettings(): Promise<object>;
      function saveSettings(settings: any): void;
    }
  }
}
