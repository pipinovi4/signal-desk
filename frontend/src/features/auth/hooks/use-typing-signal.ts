"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useTypingSignal<Field extends string>() {
  const [typingField, setTypingField] = useState<Field | null>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  const markFieldAsTyping = useCallback((field: Field) => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    setTypingField(field);
    typingTimeout.current = setTimeout(() => {
      setTypingField(null);
      typingTimeout.current = null;
    }, 600);
  }, []);

  return { typingField, markFieldAsTyping };
}
