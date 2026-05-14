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
              <stop offset="0%" stopColor="rgba(0,0,0,0.03)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1000" height="600" fill="url(#wallGrad)" />

          <rect x="120" y="82" width="760" height="318" rx="14" fill="var(--shoji-frame)" />
          <rect x="142" y="104" width="716" height="274" rx="12" fill="var(--shoji-paper)" />

          <g opacity="0.26" stroke="var(--ink-soft)" strokeWidth="3">
            <line x1="380" y1="104" x2="380" y2="378" />
            <line x1="620" y1="104" x2="620" y2="378" />
            <line x1="142" y1="242" x2="858" y2="242" />
          </g>

          <rect x="0" y="408" width="1000" height="192" fill="url(#objectShade)" opacity="0.34" />

          <rect x="94" y="286" width="232" height="132" rx="14" fill="var(--wood-dark)" />
          <rect x="132" y="252" width="156" height="36" rx="8" fill="var(--wood-mid)" />

          <rect x="390" y="314" width="220" height="108" rx="12" fill="var(--wood-mid)" />
          <rect x="444" y="274" width="112" height="42" rx="10" fill="var(--wood-dark)" />

          <rect x="674" y="276" width="236" height="146" rx="14" fill="var(--wood-dark)" />
          <rect x="724" y="240" width="136" height="38" rx="9" fill="var(--wood-mid)" />

          <circle cx="500" cy="352" r="24" fill="var(--accent-gold)" opacity="0.86" />
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
