"use client";

import { useEffect, useState } from "react";

function sameMembers(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false;
  for (const id of a) if (!b.has(id)) return false;
  return true;
}

/**
 * Returns the subset of ids that currently exist as elements in the DOM.
 * Lets nav UI gracefully disable links to sections not yet built, instead
 * of silently doing nothing when clicked.
 */
export function useAvailableSections(ids: string[]) {
  const [available, setAvailable] = useState<Set<string>>(new Set());
  // Callers often pass a freshly-mapped array each render; key off its
  // content instead of identity so this effect doesn't re-run every render.
  const idsKey = ids.join(",");

  useEffect(() => {
    const idList = idsKey.split(",").filter(Boolean);

    const check = () => {
      const next = new Set(
        idList.filter((id) => document.getElementById(id) !== null)
      );
      setAvailable((prev) => (sameMembers(prev, next) ? prev : next));
    };

    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [idsKey]);

  return available;
}
