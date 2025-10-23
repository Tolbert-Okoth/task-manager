# Full-Stack Task Manager (MERN Stack)

A full-stack task management application built with PostgreSQL, Express, React, and Node.js (PERN). The app allows users to register, log in, and manage their personal to-do tasks. User authentication is handled using JWT (JSON Web Tokens).

## Tech Stack

This project is built using the following technologies:

### Backend
* **Node.js:** JavaScript runtime environment
* **Express:** Web framework for Node.js
* **PostgreSQL:** Relational database
* **Sequelize:** ORM (Object-Relational Mapper) for Node.js
* **JSON Web Token (JWT):** For secure user authentication
* **bcryptjs:** For password hashing

### Frontend
* **React:** JavaScript library for building user interfaces
* **Vite:** Frontend build tool
* **Redux (with Redux Toolkit):** For global state management
* **React Router:** For client-side routing
* **Axios:** For making HTTP requests to the backend
* **Bootstrap & React-Bootstrap:** For UI styling and components

## Features
* User registration and login
* Secure password hashing using `bcrypt`
* JWT-based authentication and protected routes
* Full CRUD (Create, Read, Update, Delete) functionality for tasks
* Users can only view and manage their *own* tasks

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/en/) (v18 or newer, v22 used in this project)
* [PostgreSQL](https://www.postgresql.org/download/)
* A code editor (like [VS Code](https://code.visualstudio.com/))
* A database client (like [PopSQL](https://popsql.com/) or DBeaver)

## Installation & Setup

Follow these steps to get your project up and running:

### 1. Clone the Repository

```bash
git clone [https://github.com/YourUsername/task-manager.git](https://github.com/YourUsername/task-manager.git)
cd task-manager
