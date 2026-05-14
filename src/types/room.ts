export type RoomId = "entrance" | "services" | "projects" | "contact";

export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
};

export type SceneConfig = {
  tone: "dawn" | "paper" | "garden" | "tea";
  accentLabel: string;
};

export type Room = {
  id: RoomId;
  name: string;
  narrative: string;
  scene: SceneConfig;
  hotspots: Hotspot[];
};

export type RoomNavigatorProps = {
  currentIndex: number;
  totalRooms: number;
  onPrev: () => void;
  onNext: () => void;
};

export type SceneRendererProps = {
  room: Room;
  activeHotspotId: string | null;
  onHotspotSelect: (hotspotId: string) => void;
};
