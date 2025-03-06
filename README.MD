`Real-Time Chat Application`

Overview

This is a real-time chat application that allows users to sign up, log in, and send messages to each other. The application uses WebSockets (Socket.IO) for real-time messaging and MongoDB for message persistence.

`Features`

## User Authentication: Users can sign up and log in with securely stored credentials.

 ## Real-Time Messaging: Instant messaging powered by Socket.IO.

## Message Persistence: Messages are stored in MongoDB to ensure they are not lost.

 ## Simple UI: A user-friendly frontend to send and display messages.

`Tech Stack`

Backend: Node.js, Express.js, MongoDB, Socket.IO, JWT

Frontend: HTML, CSS, tailwindcss, JavaScript React.Js

Database: MongoDB(NOSQL)

Authentication: JSON Web Tokens (JWT) & bcrypt for password hashing

`Installation`

Prerequisites

Ensure you have the following installed:

Node.js (v16 or later)

MongoDB (local or cloud-based, e.g., MongoDB Atlas)

`Clone the Repository`

git clone https://github.com/yourusername/chat-app.git
 ## frist  need to checkout  to folder  and  file path 

cd chat-app
cd backend 

Install Dependencies

npm install  (to install node_modules)

Configure Environment Variables
`
`Create a .env file in the root directory and add the following:`

     MONGO_URL= mongodb+srv://jaishivkumar4:UOSKYfPyzjb8ugAM@cluster0.mmngc.mongodb.net/chat-app

     JWT_SECRET=ja12@12
Run the Application

Start Backend Server

npm run dev or node index.js   (this two can run the backend)

Start Frontend ( and this twoo will diff tab to checing locally backend and frotend should rrun in local )   

cd  chat-app
 cd frotnend 
npm start

API Endpoints

`Authentication`

POST [/api/register ]  `http://localhost:5000/api/register `  - Register a new user

POST /api/login -    `http://localhost:5000/api/login`         Authenticate and get a token

`Messaging`

POST /api/sendmessages -    `http://localhost:5000/api/sendmessages`   Send a message

GET /api/messages -        `http://localhost:5000/api/messages`          Get messages between users
  
WebSocket Events

connect - Connects a user to the WebSocket server

sendMessage - Send a message to another user

receiveMessage - Listen for incoming messages

`UI Functionality`

Users can sign up and log in.

`Users can select a contact and send messages.`

Messages appear in real time using WebSockets.


`This project is open-source under the MIT License.`