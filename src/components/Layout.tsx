import { motion } from "framer-motion";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { ease: "easeIn", duration: 0.25 },
      }}
      exit={{
        opacity: 0,
        transition: { ease: "easeOut", duration: 0.15 },
      }}>
      {children}
    </motion.div>
  );
}
