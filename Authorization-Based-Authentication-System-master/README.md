# 🚀 Authorization Based Authentication System  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![SendGrid](https://img.shields.io/badge/SendGrid-00A1E0?style=for-the-badge&logo=sendgrid&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)  

A **secure and scalable authentication system** implementing **role-based authorization**, **JWT authentication**, and **Redis-based token blacklisting**. Designed for **production-grade applications**, this system ensures **data consistency**, **security**, and **atomic operations** with **database transactions**.  
**Motto**: A robust and adaptable authentication solution for modern applications. With minor modifications, this system can be seamlessly integrated into any project requiring JWT-based authentication.

## 🔥 Features  

✅ **Role-Based Authentication** – Assign and validate user roles for access control.  
✅ **JWT Authentication** – Secure authentication with JSON Web Tokens.  
✅ **Redis Token Blacklisting** – Secure session management and logout handling.  
✅ **SendGrid Email OTP Verification** – Secure user registration with email-based OTP.  
✅ **Password Hashing** – Strong password security using **Argon2 / Bcrypt**.  
✅ **Database Transactions & Atomicity** – Prevents partial updates and ensures consistency.  


---


## 📌 API Endpoints

### 🔹 **1. User Registration & Authentication**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/sign-up` | Registers a new user by collecting user details and storing them securely. |
| **POST** | `/sign-up/otp` | Verifies the OTP sent to the user during sign-up. |
| **POST** | `/login` | Authenticates users and issues a JWT token upon successful login. |

### 🔹 **2. Role-Based Access (Protected Routes)**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/user` | Accessible only to authenticated users. Fetches user-specific data. |
| **GET** | `/admin` | Accessible only to authenticated admins. Fetches admin-related data. |

> 🛡 **Authentication & Authorization:** The above endpoints require **JWT authentication** and role-based access control (RBAC) using middleware.

### 🔹 **3. Logout Functionality**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/user/logout` | Logs out the user by blacklisting the token to invalidating the user session . |
| **GET** | `/admin/logout` | Logs out the admin by blacklisting the token to invalidating the admin session. |

---

## 📌 Authentication Flow
1️⃣ **User signs up** via `/sign-up`, and an OTP is sent for verification.  
2️⃣ **User verifies OTP** via `/sign-up/otp` to complete the registration.  
3️⃣ **User logs in** via `/login` and receives a JWT token.  
4️⃣ **Authenticated users can access** `/user`, and admins can access `/admin` (JWT required).  
5️⃣ **Users/Admins log out** via `/user/logout` or `/admin/logout`, ensuring token invalidation.  

---

## 🛠️ Technology Stack  

- **Node.js & Express.js** – Backend framework  
- **MongoDB Atlas** – Cloud database (⚠️ *Required for transaction support*) 
- **JSON Web Tokens (JWT)** – Secure authentication  
- **Redis** – Token blacklisting for session management  
- **SendGrid** – Email OTP verification  
- **Argon2 / Bcrypt** – Password hashing for security  

---

## ⚠️ Caution  

🔴 **MongoDB Atlas is required for this system as transactions are not supported by default in local mongoDB databases!**  
Local MongoDB does **not** support transactions due to the lack of **replica set initialization**, which is essential for **atomicity and consistency** in database operations.  
🔴 **Use Postman for API testing!**  
Since there is no frontend yet, **Postman** (or similar API testing tools) should be used to test the authentication and authorization endpoints.  

---

## 📌 Why Use This Authentication System?  

✔️ **Security-First Approach** – Implements best practices for authentication & authorization.  
✔️ **Scalable & Maintainable** – Designed for real-world applications with high user loads.  
✔️ **Database Integrity with Transactions** – Ensures **atomicity**, so either all steps complete or none do.  
✔️ **Session Management** – Token blacklisting prevents **replay attacks** and **unauthorized access**.  
✔️ **Reliable OTP Verification** – Ensures valid user registrations with email verification.  


---

## 📌 How Transactions Ensure Data Integrity  

This system uses **MongoDB transactions** to ensure **atomic operations** when:  
- **Creating a new user** – The user profile is saved **only if OTP verification succeeds**.  
- **Assigning user roles** – The role is **set during user registration** only if the OTP verification succeeds.    
- **Revoking JWT tokens** – The token is **blacklisted only if** session revocation succeeds.  

By using transactions, we prevent **partial updates**, maintaining **data consistency** across the database.  

---

## ⚙️ Setup & Configuration  

To use this authentication system, you **must provide the following environment variables**:  

### ** MongoDB Atlas Connection URL, Redis Connection URL, SendGrid Email API (Required)**  
This system requires a :
**MongoDB Atlas cloud database** for transaction support,
**Redis database**  for token blacklisting,
**SendGrid Email API** for user creation and OTP purpose.

```env
# Redis Connection URL (⚠️ Required for Token Blacklisting)
MONGO_LIVE=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority

# Redis Connection URL (⚠️ Required for Token Blacklisting)
REDIS_LOCAL=redis://<your-redis-host>:<port>

# SendGrid API Key (⚠️ Required for OTP Emails)
SEND_GRID=SG.xxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyy

# JWT Secret (⚠️ Required for JWT Signature generation)
SECRET=xxxxxxx.xxxxxx.yyyyyyyyyy.yyyyyyyyyyyy

# PORT Number (⚠️ Required for Running Application)
PORT=4001


```
## 🚀 Entry File  

The **entry point** for this project is:  server.js


This file initializes the **Express server**, connects to **MongoDB** and **Redis**, and sets up the required middleware.

## 🛠️ How to Clone and Run  

To get and run this server on any machine, follow these steps:  

```sh
# Clone the repository
git clone https://github.com/RishiGaneshe/Authorization-Based-Authentication-System.git

# Navigate into the project directory
cd Authorization-Based-Authentication-System

# Install dependencies
npm install

# Create a `.env` file and configure your environment variables

# Start the server
node server.js  # or use nodemon for live reloading


