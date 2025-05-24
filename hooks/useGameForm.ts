import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useRef, MutableRefObject } from "react";
import { GameState } from "../types/game";

type FormValues = {
  words: {
    letters: string[];
  }[];
};

export const useGameForm = (
  gameState: GameState | null,
  onSubmit: (guess: string) => void
) => {
  const { control, handleSubmit, reset, setValue, watch, register } =
    useForm<FormValues>({
      defaultValues: { words: [] },
    });
  const { fields } = useFieldArray({ control, name: "words" });
  const words = watch("words");
  const firstInputRef = useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (gameState?.currentItem) {
      const groups = gameState.currentItem.name.split(" ").map((word) => ({
        letters: Array(word.length).fill(""),
      }));
      reset({ words: groups });

      const focusTimer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(focusTimer);
    }
  }, [gameState?.currentItem, reset]);

  const handleInputChange = (
    groupIndex: number,
    letterIndex: number,
    value: string,
    onChange: (value: string) => void
  ) => {
    if (value.length > 1) return;

    const newValue = value.toUpperCase();
    onChange(newValue);

    if (newValue) {
      if (letterIndex < words[groupIndex].letters.length - 1) {
        const nextInputName = `words.${groupIndex}.letters.${letterIndex + 1}`;
        const nextInput = document.querySelector(
          `input[name="${nextInputName}"]`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      } else if (groupIndex < words.length - 1) {
        const nextGroupInputName = `words.${groupIndex + 1}.letters.0`;
        const nextGroupInput = document.querySelector(
          `input[name="${nextGroupInputName}"]`
        ) as HTMLInputElement;
        if (nextGroupInput) {
          nextGroupInput.focus();
        }
      } else {
        const allFilled = words.every((group) =>
          group.letters.every((letter) => letter.trim() !== "")
        );
        if (allFilled) {
          handleSubmit((data) => {
            const guess = data.words
              .map((group) => group.letters.join(""))
              .join(" ");
            onSubmit(guess);
          })();
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    groupIndex: number,
    letterIndex: number
  ) => {
    if (e.key === " ") {
      e.preventDefault();
      return;
    }

    if (e.key === "Backspace" && !words[groupIndex].letters[letterIndex]) {
      if (letterIndex > 0) {
        const prevInputName = `words.${groupIndex}.letters.${letterIndex - 1}`;
        const prevInput = document.querySelector(
          `input[name="${prevInputName}"]`
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      } else if (groupIndex > 0) {
        const prevGroup = words[groupIndex - 1];
        const prevGroupInputName = `words.${groupIndex - 1}.letters.${
          prevGroup.letters.length - 1
        }`;
        const prevInput = document.querySelector(
          `input[name="${prevGroupInputName}"]`
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  return {
    fields,
    words,
    register,
    firstInputRef,
    handleInputChange,
    handleKeyDown,
    reset,
    setValue,
  };
};
