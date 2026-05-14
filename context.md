# Context Log

## Instructions (Read First Every Session)
- Always update this file (`context.md`) during each working session.
- Keep entries chronological and append-only; do not rewrite past logs unless fixing factual errors.
- For each session, include: date/time, goals, actions taken, files changed, validation run, git actions, and pending next steps.
- Use concise bullet points and clear section headers.
- When a user gives durable workflow rules (for example, push target repo), record them here immediately.
- Before ending a session, add a final summary and explicit handoff notes for the next session.

## Durable Project Rules
- Push all changes to: `git@github.com:Hrudai-Nirmal/MachiyaHouse.git`.

## Session Log

### 2026-05-15 (Current Session)
#### Goal
- Build and implement Machiya portfolio v1 (Next.js + TypeScript) with 4-room linear navigation and SVG hotspot interactions.

#### Actions Taken
- Scaffolded Next.js App Router project in temporary lowercase path due npm uppercase-folder naming restriction, then moved project into `d:\MachiyaHouse`.
- Replaced starter template with custom Machiya portfolio architecture.
- Implemented typed domain model for rooms/hotspots/navigation/scene renderer.
- Added static room content for `Entrance`, `Services`, `Projects`, and `Contact`.
- Implemented client-side journey state with deep-link support via query param `?room=`.
- Added persistent `<` and `>` room navigation with boundary-disabled behavior.
- Added interactive SVG placeholder room scenes and hotspot components with keyboard-accessible button controls.
- Added room-local info panel with close behavior and CTA link support.
- Applied full global styling system with warm Machiya palette, atmosphere gradients, responsive layout, and subtle motion.
- Added reduced-motion accessibility fallback.
- Updated metadata and font strategy in root layout.
- Removed unused starter stylesheet.

#### Files Added
- `src/types/room.ts`
- `src/data/rooms.ts`
- `src/components/HouseJourney.tsx`
- `src/components/HotspotButton.tsx`
- `src/components/InfoPanel.tsx`
- `src/components/RoomNavigator.tsx`
- `src/components/RoomScene.tsx`
- `context.md`

#### Files Modified
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`

#### Files Removed
- `src/app/page.module.css`

#### Validation
- Ran `npx eslint .` successfully.
- Ran `npx next build` successfully (static generation completed).

#### Git / Publishing Notes
- User provided canonical remote repo: `git@github.com:Hrudai-Nirmal/MachiyaHouse.git`.
- Next action: set git remote, commit current work, and push.

#### Pending Follow-ups
- Replace placeholder contact links in `src/data/rooms.ts` with real consultant endpoints.
- Optionally add directional room transition animations and bilingual EN/JA copy structure.

### 2026-05-15 (Repo Configuration Update)
#### Additional Actions
- Configured git remote `origin` to `git@github.com:Hrudai-Nirmal/MachiyaHouse.git`.
- Committed all current workspace changes:
  - Commit: `5fc3091`
  - Message: `Build Machiya portfolio v1 and add persistent context log`
- Attempted push with `git push -u origin master`.

#### Push Status
- Push failed due to SSH authentication error:
  - `git@github.com: Permission denied (publickey).`

#### Unblock Needed
- Configure a valid SSH key for GitHub on this machine, or switch remote to HTTPS with a valid GitHub token.

### 2026-05-15 (Remote Protocol Change)
#### Additional Actions
- Updated `origin` remote from SSH to HTTPS:
  - `https://github.com/Hrudai-Nirmal/MachiyaHouse.git`
- Successfully pushed `master` to remote and set upstream tracking.

#### Updated Durable Rule
- Use HTTPS remote for this repo unless explicitly changed.

### 2026-05-15 (Fullscreen Room Layout Update)
#### Goal
- Make each room fill the entire screen and keep all UI elements inside the room itself.

#### Actions Taken
- Removed external boxed layout behavior and converted main journey container to full viewport (`100dvh`).
- Moved room heading/narrative from outside the room into an in-room overlay at the top-left.
- Moved hotspot detail panel from side layout into an in-room floating panel.
- Kept room navigation controls (`<` and `>`) inside the room as a bottom-center overlay.
- Updated `RoomScene` to accept `children` so overlays can be rendered within the room container.
- Preserved hotspot interactivity, deep-linking (`?room=`), and accessibility focus behavior.

#### Files Modified
- `src/components/HouseJourney.tsx`
- `src/components/RoomScene.tsx`
- `src/app/globals.css`

#### Validation
- Ran `npx eslint .` successfully.
- Ran `npx next build` successfully.

### 2026-05-15 (Branch Migration to main)
#### Actions Taken
- Renamed local branch from `master` to `main`.
- Pushed `main` and set upstream tracking to `origin/main`.

#### Important Result
- Attempted to delete remote `master`, but GitHub rejected deletion because `master` is currently the default branch on the remote.

#### Required External Step
- Change default branch in GitHub repository settings to `main`, then remote `master` can be deleted.

#### Durable Rule Update
- Use `main` for all future work and pushes.

### 2026-05-15 (Branch Cleanup Finalized)
#### Actions Taken
- Verified remote `master` no longer exists.
- Found and removed accidental remote branch named `origin`.
- Pruned remote-tracking refs locally.

#### Current Branch State
- Local working branch: `main`
- Remote branches: `main` only
- Workflow is now fully `main`-only.

### 2026-05-15 (Wall-Only Viewport Composition)
#### Goal
- Remove visible floor from the viewport and keep only wall-focused composition with furniture/objects.

#### Actions Taken
- Updated room SVG composition to remove explicit floor/tatami elements.
- Expanded shoji wall area and adjusted grid lines for wall-dominant framing.
- Repositioned and refined furniture/object shapes so they read against wall-only backdrop.
- Added subtle lower shading to ground objects visually without showing a literal floor plane.

#### Files Modified
- `src/components/RoomScene.tsx`

#### Validation
- Ran `npx eslint src/components/RoomScene.tsx` successfully.
- Ran `npx next build` successfully.

### 2026-05-15 (Minimal Wall Scene + Unified Wall Color)
#### Goal
- Make room visuals more minimal and closer to reference style while keeping all walls the same color.

#### Actions Taken
- Simplified scene linework (fewer shoji grid lines) for a cleaner composition.
- Increased object scale and presence to create larger focal elements.
- Unified wall color variables across all room tone classes so every room uses identical wall gradient values.

#### Files Modified
- `src/components/RoomScene.tsx`
- `src/app/globals.css`

#### Validation
- Ran `npx next build` successfully.
- Ran `npx eslint` on TSX file successfully; global CSS lint warning is expected under current config.
