"use client";

import { HotspotButton } from "@/components/HotspotButton";
import { SceneRendererProps } from "@/types/room";
import { ReactNode } from "react";

type RoomSceneProps = SceneRendererProps & {
  children?: ReactNode;
};

const toneClassMap = {
  dawn: "scene-dawn",
  paper: "scene-paper",
  garden: "scene-garden",
  tea: "scene-tea",
};

export function RoomScene({ room, activeHotspotId, onHotspotSelect, children }: RoomSceneProps) {
  const toneClass = toneClassMap[room.scene.tone];

  return (
    <section className={`scene-shell ${toneClass}`} aria-label={`${room.name} interactive room`}>
      <div className="scene-svg-wrap" aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="machiya-scene" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="wallGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--scene-wall-top)" />
              <stop offset="100%" stopColor="var(--scene-wall-bottom)" />
            </linearGradient>
            <linearGradient id="objectShade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,0,0,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1000" height="600" fill="url(#wallGrad)" />

          <rect x="64" y="88" width="872" height="286" rx="12" fill="var(--shoji-frame)" />
          <rect x="86" y="108" width="828" height="246" rx="10" fill="var(--shoji-paper)" />

          <g opacity="0.35" stroke="var(--ink-soft)" strokeWidth="3">
            <line x1="292" y1="108" x2="292" y2="354" />
            <line x1="500" y1="108" x2="500" y2="354" />
            <line x1="708" y1="108" x2="708" y2="354" />
            <line x1="86" y1="190" x2="914" y2="190" />
            <line x1="86" y1="272" x2="914" y2="272" />
          </g>

          <rect x="0" y="404" width="1000" height="196" fill="url(#objectShade)" opacity="0.35" />

          <rect x="124" y="322" width="158" height="92" rx="9" fill="var(--wood-dark)" />
          <rect x="148" y="296" width="110" height="28" rx="6" fill="var(--wood-mid)" />

          <rect x="444" y="334" width="112" height="78" rx="8" fill="var(--wood-mid)" />
          <rect x="470" y="310" width="62" height="26" rx="5" fill="var(--wood-dark)" />

          <rect x="724" y="314" width="170" height="104" rx="10" fill="var(--wood-dark)" />
          <rect x="758" y="288" width="100" height="28" rx="6" fill="var(--wood-mid)" />

          <circle cx="502" cy="354" r="18" fill="var(--accent-gold)" opacity="0.82" />
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

      {children}
    </section>
  );
}
