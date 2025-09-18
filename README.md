🛍 BuyBusy – E-Commerce Order Management App

BuyBusy is a modern, built with React and Firebase that allows users to manage product orders efficiently. It includes user authentication, dynamic product forms, styled product cards, and an order summary table.

🚀 Features

🔐 User Authentication – Secure login & signup using Firebase.

🏍️ Product Cards – Display items with quantity and pricing.

🧾 Order Management – Add, track, and display orders in real-time.

⚛️ React Context API – Smooth global state handling.


🧰 Tech Stack

Frontend: React (with Vite)

Backend: Firebase (Authentication & Firestore)

Styling: CSS Modules

State Management: React Context API

📁 Project Structure

buy-busy/
├── config/
│   └── firebaseinit.js        # Firebase configuration
├── src/
│   ├── components/            # UI components (Card, Form, Navbar, OrderTable)
│   ├── App.jsx                # Main application logic
│   ├── context.js             # Global state using Context API
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
└── .gitignore

🛠️ Getting Started

📦 Install dependencies

npm install

🔥 Set up Firebase

Go to Firebase Console

Create a new Firebase project

Enable Email/Password sign-in method in Authentication

Copy your Firebase config and paste it into config/firebaseinit.js:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

▶️ Start the development server

npm run dev

📸 Screenshots


📌 Future Improvements

Add product

Admin dashboard for order analytics

Firebase Firestore integration for real-time order storage

The project is live!  
👉 **[View Live Demo](https://buy-busy-every.netlify.app/)**

🧑‍💻 Author
Developed by: [Suraj Nishad ]

