"use client";

import { HomePage } from "@/components/HomePage";
import { normalizeHomeBlocks, type HomeBlock } from "@/lib/homeBlocks";
import type { ContactInfo } from "@/lib/contact";
import type { HeroPanelContent } from "@/lib/heroBand";
import type { StageStep } from "@/lib/stageSteps";
import { useEffect, useState } from "react";

const source = "redasy-page";

export function HomeComposer({
  blocks,
  heroPanels,
  contact,
  steps,
}: {
  blocks: HomeBlock[];
  heroPanels: HeroPanelContent[];
  contact: ContactInfo;
  steps: StageStep[];
}) {
  const [live, setLive] = useState(blocks);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("onizleme") !== "duzen") return;
    document.documentElement.classList.add("page-preview");

    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.source !== source) return;
      if (data.type === "apply") setLive(normalizeHomeBlocks(data.blocks));
      if (data.type === "highlight") setSelected(typeof data.id === "string" ? data.id : null);
      if (data.type === "reveal" && typeof data.id === "string") {
        document.querySelector(`[data-block="${CSS.escape(data.id)}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      event.preventDefault();
      event.stopPropagation();
      const node = target.closest("[data-block]");
      const id = node?.getAttribute("data-block");
      if (!id) return;
      setSelected(id);
      window.parent.postMessage({ source, type: "select", id }, window.location.origin);
    }

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    window.parent.postMessage({ source, type: "ready" }, window.location.origin);
    return () => {
      document.documentElement.classList.remove("page-preview");
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return <HomePage heroPanels={heroPanels} contact={contact} steps={steps} blocks={live} selectedId={selected} />;
}
