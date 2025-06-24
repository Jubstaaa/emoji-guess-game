import React, { RefObject } from "react";
import { motion } from "framer-motion";
import { UseFormRegister } from "react-hook-form";

interface FormData {
  words: Array<{
    letters: string[];
  }>;
}

interface LetterInputProps {
  register: UseFormRegister<FormData>;
  groupIndex: number;
  letterIndex: number;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isFirstInput: boolean;
  inputRef: RefObject<HTMLInputElement>;
  disabled: boolean;
  globalIndex: number;
}

export default function LetterInput({
  register,
  groupIndex,
  letterIndex,
  value,
  onChange,
  onKeyDown,
  isFirstInput,
  inputRef,
  disabled,
  globalIndex,
}: LetterInputProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: globalIndex * 0.05,
        },
      }}
      whileHover={{ scale: 1.05 }}
      className="w-[2rem] xs:w-[2.25rem] sm:w-10 md:w-12"
    >
      <input
        {...register(`words.${groupIndex}.letters.${letterIndex}`)}
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        ref={isFirstInput ? inputRef : undefined}
        autoFocus={isFirstInput}
        disabled={disabled}
        className="w-full h-[2rem] xs:h-[2.25rem] sm:h-10 md:h-12 text-center text-base xs:text-lg sm:text-xl md:text-2xl font-bold bg-white/50 backdrop-blur-sm border-2 border-indigo-100 rounded-lg sm:rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none disabled:bg-gray-50 disabled:border-gray-100 shadow-sm transition-all text-black"
        data-index={globalIndex}
      />
    </motion.div>
  );
}
