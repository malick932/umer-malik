"use client";

import { useEffect } from "react";

/**
 * Locks page scroll while `isLocked` is true — including touch-drag on
 * mobile, which plain `overflow: hidden` on body does not reliably block
 * (especially combined with Lenis's custom scroll handling). Uses the
 * position:fixed technique so there's no scrollable body for touch/wheel
 * input to act on at all, and restores the exact scroll position on unlock.
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
