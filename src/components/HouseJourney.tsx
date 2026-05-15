"use client";

import { InfoPanel } from "@/components/InfoPanel";
import { RoomNavigator } from "@/components/RoomNavigator";
import { RoomScene } from "@/components/RoomScene";
import { ROOMS } from "@/data/rooms";
import { RoomId } from "@/types/room";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

function isRoomId(value: string): value is RoomId {
  return ROOMS.some((room) => room.id === value);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function HouseJourney() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const introRef = useRef<HTMLElement | null>(null);

  const roomParam = searchParams.get("room");
  const currentRoomId = roomParam && isRoomId(roomParam) ? roomParam : ROOMS[0].id;
  const currentRoomIndex = ROOMS.findIndex((room) => room.id === currentRoomId);

  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentRoom = ROOMS[currentRoomIndex];

  useEffect(() => {
    const onScroll = () => {
      const node = introRef.current;

      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const travel = window.innerHeight * 1.25;
      const progress = clamp(-rect.top / travel, 0, 1);
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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

  const introScale = 1 + scrollProgress * 0.22;
  const introFade = clamp(1 - scrollProgress * 1.45, 0, 1);
  const roomFade = clamp((scrollProgress - 0.34) / 0.26, 0, 1);
  const roomScale = 1.06 - roomFade * 0.06;

  return (
    <main className="journey-root">
      <section className="intro-sequence" ref={introRef}>
        <div className="intro-sticky">
          <div
            className="cafe-entrance"
            style={{
              transform: `scale(${introScale})`,
              opacity: introFade,
            }}
            aria-hidden={roomFade > 0.95}
          >
            <div className="entrance-glow" />
            <div className="name-board">MACHIYA CAFE</div>
            <div className="paper-lantern">AI</div>
            <div className="entrance-copy">
              <p className="eyebrow">AI Consultant Portfolio</p>
              <h1>Welcome To The Cafe</h1>
              <p>Scroll down to step inside.</p>
            </div>
            <div className="door-frame">
              <div
                className="door-panel left"
                style={{ transform: `translateX(${-52 * scrollProgress}%)` }}
              >
                <img src="/shoji%20svg.svg" alt="" className="door-svg" />
              </div>
              <div
                className="door-panel right"
                style={{ transform: `translateX(${52 * scrollProgress}%)` }}
              >
                <img src="/shoji%20svg.svg" alt="" className="door-svg mirrored" />
              </div>
            </div>
          </div>

          <div
            className="room-reveal"
            style={{
              opacity: roomFade,
              transform: `scale(${roomScale})`,
            }}
          >
            <RoomScene
              room={currentRoom}
              activeHotspotId={activeHotspotId}
              onHotspotSelect={handleHotspotSelect}
            >
              <header className="room-header-overlay">
                <p className="eyebrow">Cafe Portfolio</p>
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
          </div>
        </div>
      </section>
    </main>
  );
}
