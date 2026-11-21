"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState("Copy");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("Copied");
    } catch {
      setLabel("Select and copy");
    }
    setTimeout(() => setLabel("Copy"), 1500);
  }

  return (
    <button className="g-copy" type="button" onClick={copy}>
      {label}
    </button>
  );
}
