"use client";

import { Hotspot } from "@/types/room";

type HotspotButtonProps = {
  hotspot: Hotspot;
  isActive: boolean;
  onSelect: (id: string) => void;
};

export function HotspotButton({ hotspot, isActive, onSelect }: HotspotButtonProps) {
  return (
    <button
      type="button"
      className={`hotspot ${isActive ? "hotspot-active" : ""}`}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      onClick={() => onSelect(hotspot.id)}
      aria-label={`Open details for ${hotspot.label}`}
      aria-pressed={isActive}
    >
      <span className="hotspot-pulse" aria-hidden="true" />
      <span className="hotspot-label">{hotspot.label}</span>
    </button>
  );
}
