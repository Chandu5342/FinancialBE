# Hospital Management System Backend

This repository contains the backend API for a Hospital Management System built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- User authentication
  - Signup / Login with JWT
  - Role-based access control (admin, doctor, reception, lab)
- Admin module
  - Add, update, list, remove users
  - Full + paginated user list with filters
  - Dashboard statistics (patients, doctors, reception, lab)
- Reception management
  - Add patients
  - Assign doctors
  - Fetch patient details (full + paginated + filters)
  - Billing (create bills, fetch bills, pay bills)
- Doctor module
  - Fetch assigned patients
  - Add treatment records
  - View patient history (full + paginated + filters)
  - Access lab results for patients
- Lab module
  - Upload lab results
  - Fetch lab results (full + paginated + filters)
- File uploads
  - Serve uploaded files from `/uploads`
- Middleware
  - JWT authentication
  - Role-based authorization

## Folder structure

```
backend/
│── controllers/    # API business logic
│── middleware/     # auth and role-based middleware
│── models/         # database models
│── routes/         # API endpoints
│── uploads/        # uploaded files
│── app.js          # Express app setup
│── server.js       # Server entry point
│── .env            # Environment variables
``` 

## Tech Stack

- Node.js + Express
- MongoDB (uses mongoose in current codebase)
- JWT Authentication
- bcrypt.js for password hashing
- File storage: local `/uploads` folder via Multer
- dotenv for configuration

## Environment variables

Create a `.env` file in `backend/` with values like:

```
DB_HOST=sql12.freesqldatabase.com
DB_USER=sql12800854
DB_PASSWORD=87KppxHxsi
DB_NAME=sql12800854
PORT=5000
JWT_SECRET=secret
```

## Run locally

```bash
git clone https://github.com/Chandu5342/HospitalMangamentBackend.git
cd backend
npm install
npm run dev
```

Server will run on: `http://localhost:5000`

## API Endpoints

### Auth

- `POST /api/auth/signup` - Register a new user (all roles)
- `POST /api/auth/login` - Login user, returns JWT (all roles)

### Admin routes

- `POST /api/admin/users` - Add new user (admin)
- `GET /api/admin/users` - List users (admin, reception)
- `PUT /api/admin/users/:userId` - Update user info (admin)
- `DELETE /api/admin/users/:userId` - Delete user (admin)
- `GET /api/admin/dashboard` - Dashboard stats (admin, reception)

### Patient routes

- `GET /api/patients` - Fetch all patients (filters supported) (reception, doctor, admin)
- `POST /api/patients` - Add a new patient (reception, admin)
- `PUT /api/patients/assign` - Assign doctor to patient (reception, admin)

### Doctor routes

- `GET /api/doctor/patients` - Get assigned patients (doctor)
- `POST /api/doctor/treatment` - Add treatment record (doctor)
- `GET /api/doctor/history/:patientId` - Full patient history (doctor)
- `GET /api/doctor/history/:patientId/paginated` - Paginated history (doctor)
- `GET /api/doctor/lab-results/:patientId` - Lab results for patient (doctor)

### Billing routes

- `POST /api/billings/:patientId` - Create a bill (reception, admin)
- `GET /api/billings/:patientId` - Fetch bills for patient (reception, doctor, admin)
- `POST /api/billings/:patientId/:billId/pay` - Pay a bill (reception, admin)

### Lab routes

- `POST /api/lab/upload` - Upload lab report (lab)
- `GET /api/lab/:patientId` - Fetch lab results (lab, doctor, admin)

## File uploads

Uploaded files are served via:

```
http://localhost:5000/uploads/<file-name>
```

## Live backend

Deployment platform: Render (as per your project note)

## Test accounts

- Admin: `admin@gmail.com` / `123456`
- Doctor: `doctor@gmail.com` / `123456`
- Reception: `reception@gmail.com` / `123456`
- Lab: `lab@gmail.com` / `123456`
