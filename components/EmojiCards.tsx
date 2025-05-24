import { motion } from "framer-motion";

interface EmojiCardsProps {
  emojis: string[];
}

export default function EmojiCards({ emojis }: EmojiCardsProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8"
    >
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.1,
          }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl bg-white/50 backdrop-blur-sm p-2 xs:p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-default"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {emoji}
        </motion.div>
      ))}
    </motion.div>
  );
}
