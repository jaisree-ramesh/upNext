# 🎬 Up Next

**Up Next** is a modern, lightweight media discovery web app that helps users decide *what to watch or listen to next*.

It’s **not a Netflix clone** — instead, it focuses on **searching, filtering, and tracking availability** across movies, theaters, and podcasts, all in one clean interface.

---

## ✨ Features

### 🔍 Universal Search

* Search across **movies, TV shows, and podcasts**
* One search bar available throughout the app
* Real-time filtering of results

### 🏠 Categories

* **Watch at Home** – streaming movies & shows
* **In Theaters** – movies currently playing / upcoming
* **Podcasts** – discover podcasts by category
* **Watchlist** – save items locally

### 🎛 Filters (Context-Aware)

* **Movies / Shows**

  * Genre
  * Streaming provider (Netflix, Prime, Disney+, etc.)
* **Podcasts**

  * Category

Filters automatically adapt based on the current page.

### 💾 Watchlist (Local Only)

* Add / remove movies or podcasts
* Stored using **Zustand + localStorage**
* No authentication required

### 🎠 Media Carousel

* One-card-at-a-time carousel experience
* Optimized for decision-making
* Clean animations using **shadcn/ui + Magic UI**

---

## 🧱 Tech Stack

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **React Router**

### State Management

* **Zustand**

  * Watchlist state
  * Filters (planned)
  * Search state

### Styling & UI

* **Tailwind CSS**
* **shadcn/ui**
* **Magic UI** (animated borders, gradient text)
* **Lucide React** (icons)

### APIs (Planned)

* **TMDB** – movies & TV metadata
* **ListenNotes** – podcasts



---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

App will be available at:

```
http://localhost:5173
```

---

## 🧠 Design Philosophy

* **Desktop-first**, fully responsive
* Clean, readable UI over heavy animations
* Avoid over-engineering
* Components are reusable and context-aware
* State lives in Zustand, UI stays dumb

---

## 🙌 Credits

* UI components: **shadcn/ui**, **Magic UI**
* Icons: **Lucide React**
* Data providers: **TMDB**, **ListenNotes**

---

## 📄 License

This project is for **learning and portfolio purposes**.

---

> Built step-by-step with a focus on clean architecture, modern React patterns, and great UX.
