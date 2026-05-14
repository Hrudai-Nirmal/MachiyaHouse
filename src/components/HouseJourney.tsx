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
  const [darkMode, setDarkMode] = useState(false);

  const currentRoom = ROOMS[currentRoomIndex];

  useEffect(() => {
    const onScroll = () => {
      const node = introRef.current;

      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const travel = window.innerHeight * 1.2;
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

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

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

  const introScale = 0.92 + scrollProgress * 0.12;
  const roomFade = clamp((scrollProgress - 0.08) / 0.18, 0, 1);
  const doorSlide = 112 * scrollProgress;

  return (
    <main className="journey-root">
      <section className="intro-sequence" ref={introRef}>
        <div className="intro-sticky">
          <div
            className="room-reveal"
            style={{
              opacity: roomFade,
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

          <div className="cafe-entrance" aria-hidden={roomFade > 0.98}>
            <div className="entrance-floor" />
            <div className="entrance-facade" style={{ transform: `translateX(-50%) scale(${introScale})` }}>
              <div className="name-board">MACHIYA CAFE</div>
              <button
                type="button"
                className="paper-lantern"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                AI
              </button>
              <div className="door-frame">
                <div className="door-rail" />
                <div className="door-panel left" style={{ transform: `translateX(${-doorSlide}%)` }} />
                <div className="door-panel right" style={{ transform: `translateX(${doorSlide}%)` }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
