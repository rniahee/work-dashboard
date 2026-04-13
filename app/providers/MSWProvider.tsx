"use client";

import { useEffect, useRef } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (process.env.NODE_ENV === "development") {
      import("../../mocks/browser").then(({ worker }) => {
        worker.start({ onUnhandledRequest: "bypass" });
      });
    }
  }, []);

  return <>{children}</>;
}
