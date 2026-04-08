# KYC Verification Backend API

<br>

## 📌 Project Overview

This is a backend application for KYC (Know Your Customer) verification.
Users can register, log in, and upload KYC documents.
Admins can review and update the KYC status (pending, verified, rejected).

<br>

## 🚀 Features

* User Registration & Login (JWT Authentication)
* Role-based Access (Admin / User)
* Secure Password Hashing
* File Upload for KYC Documents
* KYC Status Management
* Admin Dashboard API (View & Filter Users)

<br>

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Multer

<br>

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone YOUR_REPO_LINK
cd YOUR_PROJECT_FOLDER
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```
npm run dev
```

Server will run on:

```
http://localhost:3000
```

<br>

## 📂 API Endpoints

### 🔐 Auth Routes

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

<br>

### 📁 KYC Routes

* `POST /api/auth/upload-kyc` → Upload KYC document
* `GET /api/auth/kyc-status` → Get KYC status (User)

<br>

### 👑 Admin Routes

* `PUT /api/auth/kyc-status/:userId` → Update KYC status
* `GET /api/auth/users` → Get all users
* `GET /api/auth/users?status=verified` → Filter users by status

<br>

## 🔒 Authentication

* JWT token is required for protected routes
* Pass token in headers:

```
Authorization: YOUR_TOKEN
```

<br>

## 📌 KYC Status Flow

* Default: `pending`
* Admin can update to:

  * `verified`
  * `rejected`

<br>

## 📁 Folder Structure

```
/models
/routes
/middleware
/uploads
server.js
```

<br>

## ⚠️ Notes

* `.env`, `node_modules` and `uploads` are ignored using `.gitignore`
* Uploaded files are stored locally (for demo purposes)

