"use client";

/**
 * useScrollDirection — Track scroll direction for sticky headers.
 */

import { useState, useEffect } from "react";

export function useScrollDirection(threshold: number = 10) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        setScrollDirection(
          currentScrollY > lastScrollY ? "down" : "up"
        );
        lastScrollY = currentScrollY;
      }

      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrollDirection, scrollY };
}
