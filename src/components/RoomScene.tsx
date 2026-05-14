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
            <linearGradient id="cafeWall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--scene-wall-top)" />
              <stop offset="100%" stopColor="var(--scene-wall-bottom)" />
            </linearGradient>
            <linearGradient id="counterFront" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#8a6045" />
              <stop offset="100%" stopColor="#5a3d2c" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1000" height="600" fill="url(#cafeWall)" />

          <rect x="106" y="96" width="788" height="122" rx="14" fill="#4c3325" />
          <text x="500" y="150" textAnchor="middle" fontSize="38" fill="#f3dec2" style={{ letterSpacing: "0.08em" }}>
            MACHIYA CAFE
          </text>
          <text x="500" y="186" textAnchor="middle" fontSize="18" fill="#d4bc9f" style={{ letterSpacing: "0.1em" }}>
            AI CONSULTING MENU
          </text>

          <rect x="140" y="250" width="720" height="24" rx="8" fill="#6c4b38" />
          <rect x="170" y="206" width="42" height="44" rx="6" fill="#b48358" />
          <rect x="236" y="222" width="54" height="28" rx="6" fill="#c89664" />
          <rect x="320" y="214" width="40" height="36" rx="6" fill="#b48358" />
          <rect x="642" y="206" width="48" height="44" rx="6" fill="#b48358" />
          <rect x="710" y="220" width="58" height="30" rx="6" fill="#c89664" />
          <rect x="790" y="212" width="42" height="38" rx="6" fill="#b48358" />

          <rect x="90" y="336" width="820" height="184" rx="18" fill="url(#counterFront)" />
          <rect x="74" y="314" width="852" height="34" rx="16" fill="#9d7151" />

          <ellipse cx="260" cy="518" rx="70" ry="20" fill="#2b1a11" opacity="0.25" />
          <ellipse cx="500" cy="518" rx="70" ry="20" fill="#2b1a11" opacity="0.25" />
          <ellipse cx="740" cy="518" rx="70" ry="20" fill="#2b1a11" opacity="0.25" />
          <rect x="220" y="426" width="80" height="90" rx="16" fill="#6b4b36" />
          <rect x="460" y="426" width="80" height="90" rx="16" fill="#6b4b36" />
          <rect x="700" y="426" width="80" height="90" rx="16" fill="#6b4b36" />
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
