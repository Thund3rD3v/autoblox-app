import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("3");

  api.overlay.onUpdate(setValue);

  return (
    <>
      <h1 className="text-2xl text-gray-200">Starting In</h1>

      <AnimatePresence mode="wait">
        <motion.h2
          key={value}
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, rotateY: 360 }}
          className="text-9xl font-bold -mt-2 lead">
          {value}
        </motion.h2>
      </AnimatePresence>
    </>
  );
}

export default App;
