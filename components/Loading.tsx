import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center h-48"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </motion.div>
  );
}
