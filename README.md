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
│
├── config/
│   └── db.js                  # Sequelize DB connection setup
│
├── controllers/
│   ├── authController.js      # Register, Login logic
│   ├── categoryController.js  # Category CRUD
│   ├── transactionController.js # Transaction CRUD + filters
│   └── dashboardController.js # Summary + trends
│
├── middleware/
│   ├── authMiddleware.js      # JWT verification
│   ├── roleMiddleware.js      # Role-based access control
│   ├── errorMiddleware.js     # Global error handler
│   └── validateMiddleware.js  # Zod validation handler
│
├── models/
│   ├── index.js               # Model associations
│   ├── User.js                # User model
│   ├── Category.js            # Category model
│   └── Transaction.js         # Transaction model
│
├── routes/
│   ├── authRoutes.js          # Auth routes
│   ├── categoryRoutes.js      # Category routes
│   ├── transactionRoutes.js   # Transaction routes
│   └── dashboardRoutes.js     # Dashboard routes
│
├── validations/
│   ├── authValidation.js      # Register/Login validation
│   ├── categoryValidation.js  # Category validation
│   └── transactionValidation.js # Transaction validation
│
├── utils/
│   ├── generateToken.js       # JWT token generator
│   └── swagger.js             # Swagger config
│
├── app.js                     # Express app setup (middlewares, routes)
├── server.js                  # Entry point (DB connect + server start)
│
├── .env                       # Environment variables (NOT pushed)
├── .gitignore                 # Ignore node_modules, .env
├── package.json               # Dependencies and scripts
├── package-lock.json          # Auto-generated
│
└── README.md                  # Project documentation
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
DB_HOST=######
DB_PORT=5432
DB_NAME=######
DB_USER=#######
DB_PASSWORD=#######
PORT=5000
JWT_SECRET=#####
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
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/8c76f7b0-de05-4773-b6df-d04df532c812" />

---

---

## API Testing using Postman


Register

POST /api/auth/register
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/2cbacc42-979c-48cb-a273-e6ce1de8481f" />


Login

POST /api/auth/login
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/fd5d027c-0194-40aa-b6c2-ab1cef61957d" />


Create Category (ADMIN)

POST /api/categories
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d57f175c-06db-48fe-bef8-c2b3ee017c03" />


Get Categories

GET /api/categories
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3001b916-cc22-4d67-8376-59d5100a3c9a" />


Create Transaction (Analyst/Admin)

POST /api/transactions
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/584f63c5-ce9d-4690-a739-3057dcc25f68" />


Get Transactions

GET:

/api/transactions?page=1&limit=5&type=expense
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c49bb6c6-4611-4f64-920c-59b1d021fbad" />

Update Transaction

PUT /api/transactions/:id
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5bcf942c-f894-405f-8b5a-937c95e136e0" />


Delete Transaction

DELETE /api/transactions/:id
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/9cc339cd-4052-437d-bfdc-125c7a382a7d" />


Summary

GET /api/dashboard/summary
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/545bd476-4061-4b27-91eb-852dd00e64bb" />


Trends

GET /api/dashboard/trends
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/363147a6-5abe-433f-908c-1a142b1c82f8" />


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

