"use client";

import { InfoPanel } from "@/components/InfoPanel";
import { RoomNavigator } from "@/components/RoomNavigator";
import { RoomScene } from "@/components/RoomScene";
import { ROOMS } from "@/data/rooms";
import { RoomId } from "@/types/room";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

function isRoomId(value: string): value is RoomId {
  return ROOMS.some((room) => room.id === value);
}

export function HouseJourney() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const roomParam = searchParams.get("room");
  const currentRoomId = roomParam && isRoomId(roomParam) ? roomParam : ROOMS[0].id;
  const currentRoomIndex = ROOMS.findIndex((room) => room.id === currentRoomId);

  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const currentRoom = ROOMS[currentRoomIndex];

  const activeHotspot = useMemo(() => {
    return currentRoom.hotspots.find((hotspot) => hotspot.id === activeHotspotId) ?? null;
  }, [activeHotspotId, currentRoom.hotspots]);

  const navigateToRoom = (index: number) => {
    const safeIndex = Math.max(0, Math.min(ROOMS.length - 1, index));
    const nextRoomId = ROOMS[safeIndex].id;
    const next = new URLSearchParams(searchParams.toString());
    next.set("room", nextRoomId);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    setActiveHotspotId(null);
  };

  const handleHotspotSelect = (hotspotId: string) => {
    setActiveHotspotId((prev) => (prev === hotspotId ? null : hotspotId));
  };

  return (
    <main className="journey-root">
      <RoomScene
        room={currentRoom}
        activeHotspotId={activeHotspotId}
        onHotspotSelect={handleHotspotSelect}
      >
        <header className="room-header-overlay">
          <p className="eyebrow">Machiya Portfolio</p>
          <h1>{currentRoom.name}</h1>
          <p>{currentRoom.narrative}</p>
        </header>

        <InfoPanel room={currentRoom} hotspot={activeHotspot} onClose={() => setActiveHotspotId(null)} />

        <RoomNavigator
          currentIndex={currentRoomIndex}
          totalRooms={ROOMS.length}
          onPrev={() => navigateToRoom(currentRoomIndex - 1)}
          onNext={() => navigateToRoom(currentRoomIndex + 1)}
        />
      </RoomScene>
    </main>
  );
}
