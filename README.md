# Finance Dashboard Backend

## Objective

This project is a backend API for a Finance Dashboard system that supports role-based access control, financial data management, and analytical insights. It demonstrates backend architecture design, API structuring, data modeling, and access control mechanisms.

---

## Features

### User Authentication

* Register (sign-up) and login with JWT
* Secure password hashing using bcrypt

### Role-Based Access Control

* **Viewer**: Can view transactions and dashboard data
* **Analyst**: Can create, update, and view transactions
* **Admin**: Full access including user and category management

###  Categories Management

* Create category (admin only)
* List categories (all authenticated users)

###  Transactions Management

* Create transaction (analyst, admin)
* Get transactions (with filtering and pagination)
* Update transaction (analyst, admin)
* Delete transaction (admin)

###  Dashboard Analytics

* Total income, total expense, net balance
* Category-wise totals
* Recent transactions
* Monthly trends

###  Backend Features

* Input validation using Zod
* Centralized error handling
* RESTful API design
* Swagger API documentation

---

##  Folder Structure

```
backend/
│── config/         # DB connection and configuration
│── controllers/    # Business logic (API handlers)
│── middleware/     # Auth, role-based access, validation, error handling
│── models/         # Sequelize models
│── routes/         # API route definitions
│── validations/    # Zod schemas
│── utils/          # JWT, Swagger setup
│── app.js          # Express app setup
│── server.js       # Entry point
│── .env            # Environment variables
```

---

##  Tech Stack

* Node.js + Express
* PostgreSQL (Supabase) with Sequelize ORM
* JWT Authentication
* bcrypt for password hashing
* Zod for validation
* Swagger UI for API documentation
* nodemon for development

---

##  Database Design

The system uses three main tables:

* **Users**

  * Stores user details, roles, and status

* **Categories**

  * Master table for income and expense categories

* **Transactions**

  * Stores financial records linked to users and categories

### 🔗 Relationships

* One User → Many Transactions
* One Category → Many Transactions

---

##  Authentication

Protected routes require a JWT token:

```
Authorization: Bearer <token>
```

---

##  Environment Variables

Create a `.env` file in the root directory:

```
DB_HOST=your_host
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
PORT=5000
JWT_SECRET=your_secret_key
```

---

##  Run Locally

```bash
git clone <your-repo-url>
cd backend
npm install
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 📡 API Endpoints

### Auth

* `POST /api/auth/register`

  * body:

    ```json
    {
      "name": "Chandu",
      "email": "chandu@test.com",
      "password": "123456",
      "role": "admin"
    }
    ```

* `POST /api/auth/login`

---

###  Categories

* `POST /api/categories` (Admin only)

  * body:

    ```json
    {
      "name": "Food",
      "type": "expense"
    }
    ```

* `GET /api/categories`

---

### Transactions

* `POST /api/transactions`

* `GET /api/transactions`

  * Query params:

    * `page`, `limit`
    * `type`
    * `categoryId`
    * `startDate`, `endDate`

* `PUT /api/transactions/:id`

* `DELETE /api/transactions/:id`

---

###  Dashboard

* `GET /api/dashboard/summary`
* `GET /api/dashboard/trends`

---

## API Documentation

Swagger UI available at:

```
http://localhost:5000/api-docs
```

---

## Assumptions

* Each user manages only their own financial records
* Categories are shared globally
* Authentication is handled using JWT tokens
* Transactions are linked to users and categories

---

##  Additional Features

* JWT-based authentication
* Role-based authorization middleware
* Pagination and filtering support
* Aggregated analytics APIs
* Swagger documentation for easy testing
* Clean and modular project structure

---

