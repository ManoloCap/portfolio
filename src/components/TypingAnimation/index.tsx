"use client";
import { useState, useEffect, useRef } from "react";

interface TypingAnimationProps {
  messages: string[];
  className?: string;
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
  mistakesPerMessage?: number; // Specific number of mistakes per message
  waitBetweenMessages?: number;
  onComplete?: () => void;
}

export default function TypingAnimation({
  messages = [""],
  className = "",
  typingSpeed = 200,
  cursorBlinkSpeed = 530,
  mistakesPerMessage = 2, // New parameter for specific mistakes
  waitBetweenMessages = 2000,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  
  useEffect(() => {
    const message = messages[currentMessageIndex];
    let currentIndex = 0;
    let mistakesLeft = mistakesPerMessage;
    let currentDisplayedText = "";
    
    const typeCharacter = () => {
      if (message && currentIndex < message.length) {
        const charToType = message.charAt(currentIndex);

        // Determine if this character should be a mistake
        const isMistake = mistakesLeft > 0 && (Math.random() < 0.3);
        if (isMistake) {
          const mistakeChar = getMistakeCharacter(charToType);
          currentDisplayedText += mistakeChar;
          mistakesLeft--;

          // After displaying a mistake, quickly fix it
          setTimeout(() => {
            // Correct the mistake and append the correct character
            currentDisplayedText = currentDisplayedText.slice(0, -1) + charToType;
            setDisplayedText(currentDisplayedText);
            currentIndex++;
            setTimeout(typeCharacter, typingSpeed);
          }, typingSpeed / 2);
        } else {
          currentDisplayedText += charToType;
          setDisplayedText(currentDisplayedText);
          currentIndex++;
          setTimeout(typeCharacter, typingSpeed);
        }
      } else {
        setTimeout(() => prepareNextMessage(), waitBetweenMessages);
      }
    }

    const prepareNextMessage = () => {
      if (onComplete) onComplete();
      setDisplayedText("");
      const nextIndex = (currentMessageIndex + 1) % messages.length;
      setCurrentMessageIndex(nextIndex);
    };

    typeCharacter();
  }, [messages, currentMessageIndex, typingSpeed, waitBetweenMessages, onComplete, mistakesPerMessage]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);
    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  return (
    <span className={`block ${className}`} aria-label={messages[currentMessageIndex]}>
      {displayedText}
      <span
        className={`inline-block w-[2px] h-[1em] bg-current ml-[1px] -mb-[0.2em] transition-opacity duration-100 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </span>
  );
}

const getMistakeCharacter = (original: string): string => {
  const neighbors = getNeighboringKeys(original);
  return neighbors[Math.floor(Math.random() * neighbors.length)] || original;
};

const getNeighboringKeys = (char: string): string[] => {
  const keyboardLayout: Record<string, string[]> = {
    a: ["q", "s", "z"],
    b: ["v", "g", "h", "n"],
    c: ["x", "d", "f", "v"],
    d: ["s", "e", "r", "f", "c", "x"],
    e: ["w", "s", "d", "r"],
    f: ["d", "r", "t", "g", "v", "c"],
    g: ["f", "t", "y", "h", "b", "v"],
    h: ["g", "y", "u", "j", "n", "b"],
    i: ["u", "j", "k", "o"],
    j: ["h", "u", "i", "k", "m", "n"],
    k: ["j", "i", "o", "l", "m"],
    l: ["k", "o", "p", ";"],
    m: ["n", "j", "k", ","],
    n: ["b", "h", "j", "m"],
    o: ["i", "k", "l", "p"],
    p: ["o", "l", "[", ";"],
    q: ["1", "w", "a"],
    r: ["e", "d", "f", "t"],
    s: ["a", "w", "e", "d", "x", "z"],
    t: ["r", "f", "g", "y"],
    u: ["y", "h", "j", "i"],
    v: ["c", "f", "g", "b"],
    w: ["q", "a", "s", "e"],
    x: ["z", "s", "d", "c"],
    y: ["t", "g", "h", "u"],
    z: ["a", "s", "x"],
    ",": ["m", "k", "l", "."],
    ".": [",", "l", ";", "/"],
    " ": ["c", "v", "b", "n", "m"],
  };
  return keyboardLayout[char.toLowerCase()] || [];
};

// export default TypingAnimation;