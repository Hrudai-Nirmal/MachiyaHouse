"use client";

import { RoomNavigatorProps } from "@/types/room";

export function RoomNavigator({ currentIndex, totalRooms, onPrev, onNext }: RoomNavigatorProps) {
  const atStart = currentIndex === 0;
  const atEnd = currentIndex === totalRooms - 1;

  return (
    <div className="room-nav" role="group" aria-label="Room navigation controls">
      <button type="button" onClick={onPrev} disabled={atStart} className="nav-btn" aria-label="Previous room">
        &lt;
      </button>
      <p className="progress" aria-live="polite">{currentIndex + 1}/{totalRooms}</p>
      <button type="button" onClick={onNext} disabled={atEnd} className="nav-btn" aria-label="Next room">
        &gt;
      </button>
    </div>
  );
}
