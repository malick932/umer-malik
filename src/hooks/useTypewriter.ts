"use client";

import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

/** Cycles through a list of words with a type / pause / delete loop. */
export function useTypewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1800,
}: UseTypewriterOptions) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        const timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase("pausing"), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (phase === "pausing") {
      const timeout = setTimeout(() => setPhase("deleting"), pauseDuration / 3);
      return () => clearTimeout(timeout);
    }

    // deleting
    if (text.length > 0) {
      const timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length - 1)),
        deletingSpeed
      );
      return () => clearTimeout(timeout);
    }
    setPhase("typing");
    setWordIndex((prev) => (prev + 1) % words.length);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
