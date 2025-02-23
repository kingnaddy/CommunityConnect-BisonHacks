# Community Connect (MVP)

Community Connect is a proof-of-concept MVP designed to demonstrate how Elders can request assistance and how Volunteers can discover and fulfill those requests. Although functional, this version is intended primarily as a minimum viable product for hackathon or demonstration purposes. It integrates:

AI Categorization using OpenAI (classifies requests as Grocery, Medical, Errand, Companionship, Emergency, or General).
Distance-Based Sorting (Volunteers see nearest requests first).
Expo Location for capturing Elder/Volunteer coordinates.
Key Features
Elder Flow

Elders type a request (e.g., “I need help getting tomatoes”).
The app captures Elder’s latitude and longitude.
A call to OpenAI categorizes the request (Grocery, Medical, etc.).
Volunteer Flow

Volunteers grant location permissions.
Requests are sorted by distance (using the Haversine formula).
The nearest request is labeled “Closest Place.”
AI Categorization

Uses gpt-3.5-turbo (Chat Completions endpoint) to classify requests.
Categories: Grocery, Medical, Errand, Companionship, Emergency, General.
Note: As an MVP, this project does not include full production-level features (e.g., robust authentication, background checks, error handling, etc.).

Project Structure
cpp
Copy
.
├── App.js
├── context/
│   └── RequestsContext.js        // Manages AI categorization & request storage
├── screens/
│   ├── ElderScreen.js            // Elders type requests, capture location
│   └── VolunteerScreen.js        // Volunteers see sorted requests by distance
├── components/
│   └── RequestCard.js            // Displays each request, highlights category & distance
└── ...
Getting Started
Clone the repository:
bash
Copy
git clone https://github.com/yourusername/community-connect.git
cd community-connect
Install dependencies:
bash
Copy
npm install
Add your OpenAI API key in RequestsContext.js:
js
Copy
'Authorization': `Bearer YOUR_OPENAI_API_KEY`
Run the project:
bash
Copy
npx expo start
Test on a device/simulator:
iOS: Run on iOS Simulator from Expo Dev Tools or npx expo run:ios
Android: Run on Android device/emulator or npx expo run:android
Requirements
Node.js & npm (or yarn)
Expo CLI (optional but recommended)
OpenAI API Key (free trial credits or paid plan)
Location Permissions for both Elders & Volunteers
Contributing
Fork the repo.
Create a feature branch (git checkout -b feature-name).
Commit your changes.
Push to your fork.
Open a Pull Request.
License
This project is open-sourced under the MIT License.

Disclaimer
This project is an MVP and is not production-ready. It’s intended for demonstration and hackathon use only. Use at your own discretion.

Enjoy building intergenerational connections with Community Connect!
