# Implementation Plan - Separated Library Pages

We will create separate page components and stylesheets for each Library feature inside a new directory: `frontend/src/pages/library/`. 
This organizes the code cleanly and implements the user's explicit request.

---

## Proposed Directory Structure
```
frontend/src/pages/library/
├── RecentlyAdded.tsx
├── RecentlyAdded.css
├── Artists.tsx
├── Artists.css
├── Albums.tsx
├── Albums.css
├── Songs.tsx
└── Songs.css
```

---

## Proposed Changes

### 1. Navigation

#### [MODIFY] [NavBar.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/components/NavBar.tsx)
- Route the sidebar navigation links to:
  - **Recently Added** -> `/library` (defaults to Recently Added page)
  - **Artists** -> `/library/artists`
  - **Albums** -> `/library/albums`
  - **Songs** -> `/library/songs`
- Remove the scroll helper click logic and event parameter.

### 2. Routing

#### [MODIFY] [App.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/App.tsx)
- Import the new page components:
  - `RecentlyAdded` from `./pages/library/RecentlyAdded`
  - `Artists` from `./pages/library/Artists`
  - `Albums` from `./pages/library/Albums`
  - `Songs` from `./pages/library/Songs`
- Set up routes for:
  - `/library` -> `<RecentlyAdded>`
  - `/library/artists` -> `<Artists>`
  - `/library/albums` -> `<Albums>`
  - `/library/songs` -> `<Songs>`

### 3. New Pages in `pages/library/`

#### [NEW] [RecentlyAdded.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/pages/library/RecentlyAdded.tsx) & [RecentlyAdded.css](file:///d:/ProjectsCS/Groovy/frontend/src/pages/library/RecentlyAdded.css)
- Implement Wolfgang Mozart's dashboard hero.
- Implement the Bento layout widgets:
  - **Top Artists this Month** (clicking "View all" redirects to `/library/artists`).
  - **Recent Activity feed** (clicking on activities plays their respective mock songs).
  - **Public Playlists grid** (clicking on a playlist goes to `/playlist` or plays its songs).

#### [NEW] [Artists.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/pages/library/Artists.tsx) & [Artists.css](file:///d:/ProjectsCS/Groovy/frontend/src/pages/library/Artists.css)
- Page title "Artists".
- A search input for real-time artist filtering.
- A grid of circular artist cards (with hover glow, hover play button).
- Clicking an artist displays an **Artist Detail Drawer** or section showing:
  - Selected Artist profile image and name.
  - A scrollable list of all songs in the library by that artist.
  - Controls to play individual songs or play all tracks by the artist.

#### [NEW] [Albums.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/pages/library/Albums.tsx) & [Albums.css](file:///d:/ProjectsCS/Groovy/frontend/src/pages/library/Albums.css)
- Page title "Albums".
- A search input to filter albums.
- Grid of square album cards, derived dynamically from `mockSongs` to avoid data duplication.
- Clicking an album card opens an **Album Detail View** showing:
  - Album cover art, title, and artist name.
  - A table of songs in that album, enabling users to play any track or shuffle play the album.

#### [NEW] [Songs.tsx](file:///d:/ProjectsCS/Groovy/frontend/src/pages/library/Songs.tsx) & [Songs.css](file:///d:/ProjectsCS/Groovy/frontend/src/pages/library/Songs.css)
- Page title "Songs".
- A search/filter bar to filter by song title, artist, or album name.
- Sort buttons: sort alphabetically by title, artist, or album.
- Full track list table with headers: `#`, `Title` (with thumbnail), `Artist`, `Album`, `Duration`, `Likes` (Heart toggle).
- Rows are clickable to play the selected song immediately.

---

## Verification Plan

### Automated Verification
- Run `npm run build` after implementing to check for TypeScript types and routing compatibility.

### Manual Verification
- Click all sidebar items and verify the URL changes correctly:
  - `Recently Added` -> `/library` (shows Mozart profile dashboard)
  - `Artists` -> `/library/artists` (shows grid of artists, filterable and clickable)
  - `Albums` -> `/library/albums` (shows grid of albums, filterable and clickable)
  - `Songs` -> `/library/songs` (shows full library song list, filterable and playable)
- Verify track selection, volume adjustment, and playback transitions function seamlessly across all views.
