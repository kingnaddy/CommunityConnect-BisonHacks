# Community Connect (Expo/React Native)

**Community Connect** is a mobile MVP that lets elders post assistance requests and matches nearby volunteers by distance. It includes AI-based request categorization (via OpenAI), geolocation using Expo Location, and a simple in‑app workflow for accepting requests.

---

## ✨ Features

- **Elder flow**: Elders submit a short request; the app captures their current location (with permission) and stores the request.
- **Volunteer flow**: Volunteers see open requests **sorted by proximity** using the Haversine distance formula, and can accept a request.
- **AI categorization (MVP)**: Requests are tagged via the OpenAI Chat Completions API (replace the API key placeholder before running).
- **State via Context**: Centralized list of requests with `RequestsContext`.
- **Expo‑first**: Uses `expo-location` and `expo-constants`; runs in Expo Go or a standalone build.

---

## 🏗️ Architecture (at a glance)

- `App.js` – Role selection (Elder or Volunteer), mounts `RequestsProvider`, and renders the selected screen.  
- `context/RequestsContext.js` – Holds `requests` state and exposes `addRequest(text, category, latitude, longitude)`. Includes `categorizeRequest(text)` using OpenAI (replace `{OpenAI_APIKey}`).  
- `screens/ElderScreen.js` – Gets foreground location via `expo-location`, submits a request to context.  
- `screens/VolunteerScreen.js` – Requests volunteer location, sorts open requests by nearest first (Haversine), and renders each item with `RequestCard`.  
- `RequestCard.js` – UI for a single request with an **Accept** button.  

---

## 🔧 Setup

> Prereqs: Node.js LTS and **Expo CLI** (`npm i -g expo-cli`) or use `npx expo`.

1) **Install dependencies**
```bash
# from project root
npm install
# Ensure these are installed (Expo will prompt if missing):
npx expo install expo-location expo-constants @expo/vector-icons react-native-paper
```

2) **Configure OpenAI (optional for local demo)**
- In `context/RequestsContext.js`, replace `Bearer {OpenAI_APIKey}` with your key.  
- Or wire this to an `.env` and inject via a secure config (don’t hardcode keys in production).

3) **Run the app**
```bash
npx expo start
# press i for iOS simulator, a for Android emulator, or scan QR with Expo Go
```

---

## 🧪 How it works (MVP)

- When an **elder** submits a request, the app:
  1) asks for **location permission** (foreground)  
  2) reads the current coordinates  
  3) (optionally) calls **OpenAI** to categorize the text  
  4) saves the request into global context as **open**

- When a **volunteer** opens the app, it:
  1) asks for location permission  
  2) sorts requests by **nearest first** (Haversine distance)  
  3) lets the volunteer **accept** a request (simple local state update in MVP)

---

## 📁 Project Structure

```
CommunityConnect/
├─ App.js
├─ index.js
├─ RequestCard.js
├─ context/
│  └─ RequestsContext.js         # requests state + categorize/add APIs
├─ screens/
│  ├─ ElderScreen.js             # elders post requests, capture location
│  └─ VolunteerScreen.js         # volunteers see/accept nearest requests
├─ assets/                       # app icons & assets
├─ app.json                      # Expo config
└─ package.json
```

---

## ⚠️ Notes & Limitations

- **API key**: The OpenAI key in `RequestsContext.js` is a placeholder. Use a secure approach for secrets; never commit real keys.
- **Persistence**: This MVP keeps state in memory only. Restarting the app resets requests.
- **Security**: No auth, rate limiting, or backend. Treat this as a prototype only.
- **Location**: Uses foreground location; add background handling and UI affordances for production.

---

## 🛣️ Roadmap

- Move data and actions to a **backend** (Supabase/Firebase/Express).
- **Persistent storage** (AsyncStorage or remote DB).
- **Auth** (Clerk/Expo Auth, OAuth).
- Improved **category model** (server-side function, retriable, cached).
- Real-time updates with subscriptions or push notifications.

---

## 📝 License

MIT License (add or update the `LICENSE` file as needed).
