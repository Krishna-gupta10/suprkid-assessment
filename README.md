#Taskify - Task Management App

Taskify is a task management application built with React and Vite for the frontend and Express for the backend. It allows users to create, update, delete tasks, and track their progress. The app also includes a feature to mark tasks as complete/incomplete with a toggle button.

## Features
- Create, update, and delete tasks.
- Mark tasks as complete/incomplete.
- React Toastify for clean alerts.
- Responsive and user-friendly interface.

## Tech Stack
- **Frontend**: React, Vite
- **Backend**: Express
- **Database**: MongoDB compass

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** (>=v16.0.0)
- **npm** (Node Package Manager) 

## Installation

Follow these steps to run the app locally:

### 1. Clone the repository
```bash
git clone https://github.com/krishna-gupta10/suprkid-assessment.git
cd taskify
```

### 2. Install frontend dependencies
Navigate to the frontend directory and install the required packages:

```bash
cd client
npm install
```

### 3. Install backend dependencies
Navigate to the backend directory and install the required packages:

```bash
cd server
npm install
```

### 5. Run the application
Start the backend server
In the server directory, run the following command to start the Express server:

```bash
nodemon ./server.js
```

### Start the frontend server
In the client directory, run the following command to start the React application with Vite:
```bash
npm run dev
```
