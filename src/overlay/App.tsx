import { useState } from "react";

function App() {
  const [value, setValue] = useState("3");

  api.overlay.onUpdate(setValue);

  return (
    <>
      <h1 className="text-2xl text-gray-200">Starting In</h1>
      <h2 className="text-9xl font-bold -mt-2 lead">{value}</h2>
    </>
  );
}

export default App;
