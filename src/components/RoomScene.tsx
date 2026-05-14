"use client";

import { HotspotButton } from "@/components/HotspotButton";
import { SceneRendererProps } from "@/types/room";

const toneClassMap = {
  dawn: "scene-dawn",
  paper: "scene-paper",
  garden: "scene-garden",
  tea: "scene-tea",
};

export function RoomScene({ room, activeHotspotId, onHotspotSelect }: SceneRendererProps) {
  const toneClass = toneClassMap[room.scene.tone];

  return (
    <section className={`scene-shell ${toneClass}`} aria-label={`${room.name} interactive room`}>
      <div className="scene-svg-wrap" aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="machiya-scene">
          <defs>
            <linearGradient id="wallGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--scene-wall-top)" />
              <stop offset="100%" stopColor="var(--scene-wall-bottom)" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1000" height="600" fill="url(#wallGrad)" />
          <rect x="0" y="390" width="1000" height="210" fill="var(--scene-floor)" />
          <rect x="64" y="82" width="872" height="254" rx="12" fill="var(--shoji-frame)" />
          <rect x="86" y="102" width="828" height="214" rx="10" fill="var(--shoji-paper)" />
          <g opacity="0.35" stroke="var(--ink-soft)" strokeWidth="3">
            <line x1="292" y1="102" x2="292" y2="316" />
            <line x1="500" y1="102" x2="500" y2="316" />
            <line x1="708" y1="102" x2="708" y2="316" />
            <line x1="86" y1="173" x2="914" y2="173" />
            <line x1="86" y1="245" x2="914" y2="245" />
          </g>
          <rect x="94" y="408" width="812" height="160" rx="10" fill="var(--tatami)" />
          <g opacity="0.4" stroke="var(--ink-soft)">
            <line x1="364" y1="408" x2="364" y2="568" />
            <line x1="636" y1="408" x2="636" y2="568" />
          </g>
          <rect x="130" y="324" width="128" height="80" rx="8" fill="var(--wood-dark)" />
          <rect x="458" y="338" width="88" height="66" rx="6" fill="var(--wood-mid)" />
          <rect x="750" y="320" width="140" height="84" rx="8" fill="var(--wood-dark)" />
          <circle cx="502" cy="370" r="14" fill="var(--accent-gold)" opacity="0.8" />
        </svg>
      </div>

      <div className="hotspot-layer">
        {room.hotspots.map((hotspot) => (
          <HotspotButton
            key={hotspot.id}
            hotspot={hotspot}
            isActive={hotspot.id === activeHotspotId}
            onSelect={onHotspotSelect}
          />
        ))}
      </div>
    </section>
  );
}
