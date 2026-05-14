"use client";

import { Hotspot, Room } from "@/types/room";

type InfoPanelProps = {
  room: Room;
  hotspot: Hotspot | null;
  onClose: () => void;
};

export function InfoPanel({ room, hotspot, onClose }: InfoPanelProps) {
  return (
    <aside
      className={`info-panel ${hotspot ? "info-panel-open" : ""}`}
      aria-live="polite"
      aria-label={`${room.name} detail panel`}
    >
      {hotspot ? (
        <>
          <div className="info-header">
            <p className="eyebrow">{room.scene.accentLabel}</p>
            <button type="button" className="close-btn" onClick={onClose} aria-label="Close detail panel">
              Close
            </button>
          </div>
          <h3>{hotspot.title}</h3>
          <p>{hotspot.description}</p>
          {hotspot.cta ? (
            <a
              className="panel-link"
              href={hotspot.cta.href}
              target={hotspot.cta.external ? "_blank" : undefined}
              rel={hotspot.cta.external ? "noopener noreferrer" : undefined}
            >
              {hotspot.cta.label}
            </a>
          ) : null}
        </>
      ) : (
        <>
          <p className="eyebrow">{room.scene.accentLabel}</p>
          <h3>{room.name}</h3>
          <p>Select a highlighted object in the room to view details.</p>
        </>
      )}
    </aside>
  );
}
