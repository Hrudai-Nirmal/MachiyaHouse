import { HouseJourney } from "@/components/HouseJourney";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<main className="journey-root">Loading Machiya...</main>}>
      <HouseJourney />
    </Suspense>
  );
}
