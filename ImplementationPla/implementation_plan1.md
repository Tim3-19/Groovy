# Implementation Plan - Groovy Frontend Redesign

We will implement a premium, high-fidelity user interface for the Groovy music streaming platform inspired by the Stitch project **Aura Stream / Pure Fire** (ID: `13955954669789325582`). The app will feature a sophisticated night-mode luxury style with **Glassmorphism**, atmospheric color glows, and a **Fixed-Fluid Hybrid** bento layout.

## Design System Tokens & Style

We will translate the Stitch project's design configuration into a comprehensive Vanilla CSS variable system in `index.css`:
- **Primary (Fire Orange):** `#ff4d00` (actions, playback, active states)
- **Secondary (Electric Blue):** `#00e5ff` (mood tags, badges)
- **Surface Foundations:** `#0F1115` (base bg), `#1A1D23` (sidebar/cards bg), `#2D1B16` (surface container)
- **Typography:**
  - Headlines: Hanken Grotesk
  - Body: Inter
  - Metadata: JetBrains Mono
- **Materiality:** Semi-transparent borders, `backdrop-filter: blur(20px)`, and radial gradients (`hero-glow` and `gradient-blur`).

---

## User Review Required

> [!IMPORTANT]
> The original app rendered a full-screen now-playing vinyl record player directly on the `/` route. 
> To provide a real streaming app experience, we will restructure the layout:
> 1. Make the left **Sidebar**, top **Header**, and bottom **Player Bar** persistent elements across all pages.
> 2. Introduce a structured route system:
>    - `/`: The new **Home Page** with the bento layout.
>    - `/search`: The **Search Page** with category grids.
>    - `/playlist`: The **Playlist Page** with the full track table.
>    - `/library`: The **Library/Profile Page** showing Wolfgang Mozart's dashboard.
> 3. Add an interactive **Now Playing Panel** toggle: clicking the album cover in the bottom-left player bar will open the original full-screen Vinyl Record player in a gorgeous glassmorphic overlay. This preserves the vinyl animation and blur backgrounds.

---

## Proposed Changes

### 1. Data Layer

#### [NEW] [mockData.ts](file:///d:/ProjectsCS/Groovy/frontend/src/data/mockData.ts)
- Create a detailed mock data file containing songs, playlists, artists, categories, and recent activity.
- The songs will use high-quality cover image URLs from the Stitch design and working fallback audio links (e.g. from SoundHelix or public domains) for realistic playback testing.

### 2. Stylesheets & Setup

#### [MODIFY] [index.html](file:///d:/ProjectsCS/Groovy/frontend/index.html)
- Inject Google Fonts (Hanken Grotesk, Inter, JetBrains Mono) and Material Symbols Outlined icons.

#### [MODIFY] [index.css](file:///d:/ProjectsCS/Groovy/frontend/src/index.css)
- Implement full design system CSS tokens (colors, fonts, sizes, shapes, spacings).
- Add global utilities: custom thin scrollbar, glass panels, atmospheric glow animations.

#### [MODIFY] [App.css](file:///d:/ProjectsCS/Groovy/frontend/src/App.css)
- Implement structural layout styles: grid containers, fixed sidebar, main scrollable area, persistent bottom bar, and now-playing overlay transitions.

### 3. App Core & Routing

#### [MODIFY] [App.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/App.tsx)
- Restructure the UI grid to hold persistent Sidebar, Header, and Player Bar components.
- Wire the global audio engine (state: `queue`, `currentIndex`, `isPlaying`, `progress`, `duration`, `volume`) to react to page interactions.
- Provide a state for toggling the Now Playing Fullscreen Vinyl Overlay.
- Add `/library` route and link sidebar actions.
- Fallback fetch to mock data if the backend server is offline, ensuring a plug-and-play experience.

### 4. Components

#### [MODIFY] [NavBar.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/components/NavBar.tsx)
- Update into a premium sidebar rail incorporating a logo, navigation links, and Wolfgang's user profile metadata card.

#### [NEW] [Header.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/components/Header.tsx)
- Add a top bar containing search input, settings/notifications, and the profile avatar.

#### [NEW] [PlayerBar.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/components/PlayerBar.tsx)
- Create a beautiful glassmorphic player at the screen's bottom with track info, play controls, progress scrubbers, volume controls, and a Now Playing expander trigger.

### 5. Pages

#### [MODIFY] [Home.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/pages/Home.tsx)
- Build the "Jump back in" playlist cards, "Trending Now" bento slider, and "Made for Wolfgang" tracks table.
- Clicking on any play button will load and start playing the track/playlist instantly.

#### [MODIFY] [Search.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/pages/Search.tsx)
- Redesign the search input, interactive "Recent searches" history list, and the colorful "Browse all" grid of category cards with tilted images.
- Enable live filtering results on keyup.

#### [MODIFY] [Playlist.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/pages/Playlist.tsx)
- Redesign into a detailed playlist page with the volcano-glow hero banner.
- Render the 9-song tracklist table with added timestamps, play icons on hover, and active track orange highlighting.

#### [NEW] [Library.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/pages/Library.tsx)
- Create the user dashboard displaying Wolfgang Mozart's stats, "Verified Premium Member" badge, Top Artists (Grimes, Frank Ocean, Daft Punk, Kanye West), recent activity timeline, and public playlists.

---

## Verification Plan

### Manual Verification
1. Open the application in the browser.
2. Confirm the visual aesthetics match the deep dark mode luxury system (Hanken Grotesk headers, Material icons, glass panels, ambient orange glows).
3. Test page navigation (Home, Search, Playlist, Library) to ensure playback continues seamlessly.
4. Interact with the Player Bar (Play/Pause, Prev, Next, Volume control, timeline scrubbing).
5. Click on track rows in the Home / Playlist tables and verify they play.
6. Search for specific terms in the search page and verify real-time suggestions and recent search updates.
7. Click the bottom-left song cover and verify the full-screen glassmorphic spinning Vinyl record overlay opens with background blur, and collapses gracefully.
