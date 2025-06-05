# 🎮 admin-console-react

> **⚠️ Work In Progress — Console loading... please wait...**

Welcome to **admin-console-react**, the ultimate admin dashboard to manage your Game Center's players and games like a true overlord 👑

---

## 🚀 Getting Started

```bash
yarn install
yarn start
```

And just like that... 💥 you're in control.

---

## 🧩 Features

### Players 👤

* 🔍 Search players (by name, email, country, etc.)
* ➕ Create new players
* 🛠️ Edit player profiles
* ❌ Delete, deactivate or ban players

### Games 🎲

* 🎮 List all games
* ➕ Add new games
* 🛠️ Edit game details
* ❌ Delete or deactivate games

All powered by the mighty `GLOBAL-GAME-API` backend 💪

---

## 🗂️ Backend Structure (NestJS)

The admin console is powered by this beautiful backend structure:

```
src/
├── common/
├── contests/service/
├── datas/
├── games/
│   ├── api/
│   ├── module/
│   └── service/
├── players/
│   ├── api/
│   ├── module/
│   └── service/
├── app.module.ts
└── main.ts
```
