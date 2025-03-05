import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  message: string
  className?: string
  typingSpeed?: number
  cursorBlinkSpeed?: number
  mistakeProbability?: number
  pauseDuration?: number
  maxMistakeLength?: number
  onComplete?: () => void
}

export default function TypingAnimation({
  message,
  className,
  typingSpeed = 200, // 0.2 seconds per character
  cursorBlinkSpeed = 530,
  mistakeProbability = 0.2,
  pauseDuration = 1000,
  maxMistakeLength = 3, // Maximum number of characters to type before forcing correction
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  // Use refs to track state without triggering re-renders
  const targetTextRef = useRef("")
  const mistakeMode = useRef(false)
  const mistakeLength = useRef(0)
  const messageRef = useRef(message)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  // Update message ref when message prop changes
  useEffect(() => {
    messageRef.current = message

    // Reset animation state when message changes
    setDisplayedText("")
    targetTextRef.current = ""
    mistakeMode.current = false
    mistakeLength.current = 0
    setIsTyping(true)
    setIsComplete(false)

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [message])

  // Handle cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (mountedRef.current) {
        setShowCursor((prev) => !prev)
      }
    }, cursorBlinkSpeed)

    return () => clearInterval(cursorInterval)
  }, [cursorBlinkSpeed])

  // Main typing animation logic
  useEffect(() => {
    mountedRef.current = true

    const typeNextCharacter = () => {
      if (!mountedRef.current) return

      // If we're not in typing mode, don't do anything
      if (!isTyping) return

      // If we're in mistake mode, we need to backspace to correct
      if (mistakeMode.current) {
        if (displayedText.length > targetTextRef.current.length) {
          setDisplayedText((prev) => prev.slice(0, -1))
          mistakeLength.current -= 1

          // Schedule next backspace
          timeoutRef.current = setTimeout(typeNextCharacter, typingSpeed)
        } else {
          // We've corrected the mistake, continue normal typing
          mistakeMode.current = false
          mistakeLength.current = 0
          timeoutRef.current = setTimeout(typeNextCharacter, typingSpeed)
        }
        return
      }

      // If we've completed the message
      if (targetTextRef.current.length >= messageRef.current.length) {
        setIsTyping(false)
        setIsComplete(true)
        if (onComplete && mountedRef.current) onComplete()
        return
      }

      // Add the next character
      const nextCharIndex = targetTextRef.current.length
      const correctChar = messageRef.current[nextCharIndex]

      // Decide if we should make a typo
      const shouldMakeTypo =
        Math.random() < mistakeProbability &&
        correctChar !== " " &&
        nextCharIndex < messageRef.current.length - 1 &&
        mistakeLength.current < maxMistakeLength

      if (shouldMakeTypo) {
        // Make a typo by using a nearby character on the keyboard
        const typoChars = getNeighboringKeys(correctChar)
        const typoChar = typoChars[Math.floor(Math.random() * typoChars.length)]

        setDisplayedText((prev) => prev + typoChar)
        mistakeMode.current = true
        mistakeLength.current += 1

        // Schedule next character (backspace)
        timeoutRef.current = setTimeout(typeNextCharacter, typingSpeed)
      } else {
        // Add the correct character
        targetTextRef.current += correctChar
        setDisplayedText(targetTextRef.current)

        // Occasionally pause after completing a word (with reduced probability)
        if (correctChar === " " && Math.random() < 0.15) {
          setIsTyping(false)

          pauseTimeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              setIsTyping(true)
              timeoutRef.current = setTimeout(typeNextCharacter, typingSpeed)
            }
          }, pauseDuration)
        } else {
          // Schedule next character
          timeoutRef.current = setTimeout(typeNextCharacter, typingSpeed)
        }
      }
    }

    // Start the typing animation if we're in typing mode
    if (isTyping && !isComplete) {
      timeoutRef.current = setTimeout(typeNextCharacter, typingSpeed)
    }

    // Cleanup function
    return () => {
      mountedRef.current = false

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
        pauseTimeoutRef.current = null
      }
    }
  }, [
    isTyping,
    isComplete,
    typingSpeed,
    pauseDuration,
    mistakeProbability,
    onComplete,
    maxMistakeLength,
    displayedText,
  ])

  // Safety mechanism to ensure animation completes
  useEffect(() => {
    if (isTyping && !isComplete && targetTextRef.current.length > 0) {
      const safetyTimeout = setTimeout(() => {
        // If we're still typing but haven't made progress in 3 seconds
        if (isTyping && !isComplete && targetTextRef.current.length < messageRef.current.length) {
          console.log("Animation safety triggered - completing animation")

          // Force complete the animation
          targetTextRef.current = messageRef.current
          setDisplayedText(messageRef.current)
          setIsTyping(false)
          setIsComplete(true)

          if (onComplete && mountedRef.current) onComplete()
        }
      }, 3000) // 3 second safety timeout

      return () => clearTimeout(safetyTimeout)
    }
  }, [isTyping, isComplete, onComplete])

  return (
    <span className={cn("inline-block", className)} aria-label={message}>
      {displayedText}
      <span
        className={cn(
          "inline-block w-[2px] h-[1em] bg-current ml-[1px] -mb-[0.2em] transition-opacity duration-100",
          showCursor ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
    </span>
  )
}

// Helper function to get neighboring keys for realistic typos
function getNeighboringKeys(char: string): string[] {
  const lowercaseChar = char.toLowerCase()
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
  }

  return keyboardLayout[lowercaseChar] || ["e", "a", "r", "t"]
}

