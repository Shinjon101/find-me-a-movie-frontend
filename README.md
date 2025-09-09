# 🎬 Find Me a Movie · V2

React · Vite · TypeScript · Chakra UI

A responsive, accessible movie discovery app built with modern React and TypeScript. Search, filter, sort, and explore movies in a clean interface with infinite scrolling and dark‑mode support.

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/3ead6d58-e5c5-4c66-840a-19982d12a65a" />

---
## About The Project

### Find Me a Movie · V2 is the second version of my movie discovery client.
Unlike V1 (which consumed the TMDB API), this version connects to my own Node.js + MongoDB API for full control over data, validation, and security.
- Search movies by title 
- Filter by genre  
- Sort by popularity, rating, or release date  
- Browse with infinite scrolling  
- View detailed info (poster, synopsis, rating)  
- Toggle light/dark themes  
- Enjoy a fully responsive layout  

State is managed with Zustand, data fetching uses TanStack Query, and UI components come from Chakra UI. Tests are written with Vitest and React Testing Library.

---

## 📁 Project Structure
```
find-me-a-movie/
├── public
├── src/
│ ├── Components/
│ ├── Pages/
│ ├── assets/
│ ├── data/
│ ├── hooks/
│ ├── services/
│ ├── index.css
│ ├── main.tsx
│ ├── routes.tsx
│ ├── theme.ts
│ └── vite-env.d.ts
├── tests/
├── package.json
├── tsconfig.json
└── vite.config.ts

```
---

## Tech Stack

- React + Vite + TypeScript  
- Chakra UI  
- Zustand  
- TanStack Query  
- Axios  
- React Router v6  
- TMDB API  
- Vitest & React Testing Library  

---

## 🚀 Getting Started



### Installation

1.Clone the repo:
```
git clone https://github.com/Shinjon101/find-me-a-movie-frontend.git
```
2.Install packages:
```
npm install
```
 3.Run development server:
```
npm run dev
```
 
### Running Tests
```
npm run test  

npm run test:ui  

npm run coverage
```

---

## Author

Built with ❤️ by Shinjon — open to feedback and contributions.

---

