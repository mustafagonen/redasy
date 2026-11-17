"use client";

import { isThemeId, themeTokens, type ThemeId } from "@/lib/theme";
import { useEffect } from "react";

const source = "redasy-theme";

function colorKey(value: string) {
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
  if (!match) return "";
  if (match[4] !== undefined && Number(match[4]) === 0) return "";
  return `${match[1]},${match[2]},${match[3]}`;
}

function hexKey(value: string) {
  const hex = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (!hex) return "";
  const num = Number.parseInt(hex[1], 16);
  return `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;
}

export function ThemeBridge() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("onizleme") !== "tema") return;
    const rootNode = document.querySelector("[data-site]");
    if (!(rootNode instanceof HTMLElement)) return;
    const root: HTMLElement = rootNode;

    document.documentElement.classList.add("theme-preview");

    function apply(theme: Record<string, unknown>) {
      for (const [id, value] of Object.entries(theme)) {
        if (isThemeId(id) && typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value)) {
          root.style.setProperty(`--theme-${id}`, value);
        }
      }
    }

    function highlight(id: string | null) {
      root.querySelectorAll("[data-theme]").forEach((node) => {
        node.classList.toggle("theme-hot", Boolean(id) && node.getAttribute("data-theme") === id);
      });
    }

    function tokenFor(color: string) {
      const key = colorKey(color);
      if (!key) return null;
      const style = getComputedStyle(root);
      for (const token of themeTokens) {
        const current = style.getPropertyValue(`--theme-${token.id}`);
        if (hexKey(current) === key) return token.id;
      }
      return null;
    }

    function collect(target: Element) {
      const found: ThemeId[] = [];
      let node: Element | null = target;
      while (node) {
        const id = node.getAttribute("data-theme");
        if (id && isThemeId(id) && !found.includes(id)) found.push(id);
        if (node === root) break;
        node = node.parentElement;
      }
      if (!found.length) {
        let probe: Element | null = target;
        while (probe && probe !== root.parentElement) {
          const style = getComputedStyle(probe);
          const background = tokenFor(style.backgroundColor);
          const foreground = tokenFor(style.color);
          if (background && !found.includes(background)) found.push(background);
          if (foreground && !found.includes(foreground)) found.push(foreground);
          if (found.length) break;
          probe = probe.parentElement;
        }
      }
      return found;
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.source !== source) return;
      if (data.type === "apply" && data.theme && typeof data.theme === "object") apply(data.theme);
      if (data.type === "highlight") highlight(typeof data.id === "string" ? data.id : null);
    }

    function onClick(event: MouseEvent) {
      if (event.button !== 0) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) return;
      event.preventDefault();
      event.stopPropagation();
      const tokens = collect(target);
      if (!tokens.length) return;
      window.parent.postMessage(
        { source, type: "pick", tokens, x: event.clientX, y: event.clientY },
        window.location.origin,
      );
    }

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    window.parent.postMessage({ source, type: "ready" }, window.location.origin);

    return () => {
      document.documentElement.classList.remove("theme-preview");
      highlight(null);
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
