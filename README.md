# Finance Dashboard Backend

This repository is a Finance Dashboard backend API built with Node.js, Express, PostgreSQL (Sequelize), JWT authentication, and Swagger API docs.

## Features

- User authentication
  - Register (sign-up) and login with JWT
- Role-based access control
  - `admin`, `analyst` (as defined by `authorizeRoles` use)
- Categories management
  - Create category (admin only)
  - List categories (all authenticated users)
- Transactions management
  - Create transaction (analyst, admin)
  - Get transactions (authenticated users, with filtering by user+date)
  - Update transaction (analyst, admin)
  - Delete transaction (admin)
- Dashboard metrics
  - Summary and monthly trends (authenticated users)
- Central error handling and request validation (zod)

## Folder structure

```
backend/
│── config/         # DB connection and config
│── controllers/    # Request handlers
│── middleware/     # Auth, role middleware, validation, errors
│── models/         # Sequelize models
│── routes/         # API routes
│── utils/          # token generation, swagger setup
│── app.js          # Express app setup
│── server.js       # Server entrypoint
│── .env            # Environment variables
``` 

## Tech Stack

- Node.js + Express
- PostgreSQL via Sequelize
- JWT Authentication
- bcrypt for password hashing
- Zod for validation
- Swagger UI for API docs
- nodemon for development

## Environment variables

Create a `.env` file in `backend/` with values like:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
PORT=5000
JWT_SECRET=secret
```

## Run locally

```bash
git clone <your-repo-url>
cd backend
npm install
npm run dev
```

Server will run on: `http://localhost:5000`

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
  - body: `{ name, email, password, role, isActive }`
- `POST /api/auth/login` - Login user
  - body: `{ email, password }`

### Categories

- `POST /api/categories` - Add new category (admin only)
  - header: `Authorization: Bearer <token>`
  - body: `{ name }`
- `GET /api/categories` - List categories (authenticated users)

### Transactions

- `POST /api/transactions` - Create transaction (analyst, admin)
  - body: `{ type: 'income'|'expense', amount, categoryId, date?, note? }`
- `GET /api/transactions` - Get transactions (authenticated user)
  - supports query params: `page`, `limit`, `startDate`, `endDate`, `type`, `category`, `search`
- `PUT /api/transactions/:id` - Update transaction (analyst, admin)
- `DELETE /api/transactions/:id` - Delete transaction (admin)

### Dashboard

- `GET /api/dashboard/summary` - Get cumulative income/expense summary
- `GET /api/dashboard/trends` - Get monthly income/expense trends

## API documentation

Open `http://localhost:5000/api-docs` for Swagger UI.

## Notes

- The backend uses PostgreSQL and the Sequelize ORM.
- Role checks are enforced in `middleware/roleMiddleware.js`.
- JWT auth is enforced in `middleware/authMiddleware.js`.
- Validation rules are in `validations/*` with Zod schemas.

