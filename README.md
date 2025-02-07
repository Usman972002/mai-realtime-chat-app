# Chat Application

This is a **MERN (MongoDB, Express, React, Node.js) Chat Application** with **Socket.IO** for real-time messaging, supporting both individual and group chats.

---

## 🚀 Features

- **Real-time Messaging** (1-on-1 & Group Chats) using **Socket.IO**
- **User Authentication** (JWT-based)
- **Profile Pictures for Users**
- **Online Users Tracking**
- **Group Chat Functionality**
- **REST API with Express.js & MongoDB**
- **React Frontend with Zustand for State Management**

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Zustand, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Real-time Communication:** Socket.IO
- **Authentication:** JWT (JSON Web Tokens)

---

## 📌 Prerequisites

Ensure you have the following installed:
- **Node.js** (>= 14)
- **MongoDB** (Local or Cloud - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## 🛠️ Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Usman972002/mai-realtime-chat-app.git
```

### **2️⃣ Install Dependencies**
#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd frontend
npm install
```

---

## 🔑 Environment Variables

Create a **.env** file in the `backend` directory and add:

```
PORT = 3001
MONGO_URL_LOCAL = mongodb://localhost:27017/maichatapp
# MONGO_URL_GLOBAL = YOUR_GLOBAL_URL
JWT_SECRET=12345
NODE_ENV='development'
```

---

## 🚀 Running the Application

### **1️⃣ Start the Backend**
```sh
cd backend
npm start  (OR) node server.js
```

### **2️⃣ Start the Frontend**
```sh
cd frontend
npm run dev
```

The frontend will run on **http://localhost:3000** and the backend on **http://localhost:3001**.

---

## 🔥 API Routes

### **User Authentication**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login user
- `GET /api/auth/user` → Get authenticated user details

### **Messages & Chat**
- `POST /api/messages/send` → Send a message
- `GET /api/messages/:conversationId` → Get messages

### **Group Chat**
- `POST /api/groups/create` → Create a new group
- `POST /api/groups/:groupId/send` → Send a message in a group
- `GET /api/groups/:groupId/messages` → Get group messages

---

## ⚡ WebSocket (Socket.IO) Events

| Event Name          | Description                   |
|--------------------|-------------------------------|
| `connect`         | User connects to socket       |
| `getOnlineUsers`  | Retrieves online users        |
| `sendMessage`     | Sends a private message       |
| `receiveMessage`  | Receives a private message    |
| `sendGroupMessage` | Sends a message in a group   |
| `newGroupMessage` | Receives a group message      |

---

## 📧 Contact

For any queries, reach out at: [mohammedusmanshaik197822@gmail.com](mailto:mohammedusmanshaik197822@gmail.com)

