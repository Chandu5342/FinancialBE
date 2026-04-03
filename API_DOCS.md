# API Documentation

This document provides details about all available API endpoints in the Finance Dashboard Backend.

---

## Base URL

http://localhost:5000

---

##  Authentication


After logging in, you will receive a JWT token.

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### How to use the token

For all protected APIs, include the token in the request header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

##  Authorization & Roles

| Role    | Permissions                                        |
| ------- | -------------------------------------------------- |
| Viewer  | Can only view data (GET APIs)                      |
| Analyst | Can create, update, and view transactions          |
| Admin   | Full access including delete and category creation |

### Error Responses

Invalid or missing token:

```json
{
  "message": "Not authorized"
}
```

Unauthorized action:

```json
{
  "message": "Access denied"
}
```

---
Swagger UI available at:

```
http://localhost:5000/api-docs
```
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/8c76f7b0-de05-4773-b6df-d04df532c812" />

---


##  Auth APIs

### Register

POST /api/auth/register

Body:

```json
{
  "name": "Chandu",
  "email": "chandu@gmail.com",
  "password": "123456",
  "role": "admin"
}
```
<img width="1366" height="768" alt="Screenshot (2695)" src="https://github.com/user-attachments/assets/3098a539-eefc-4947-a800-9702b207bf46" />

---

### Login

POST /api/auth/login

Body:

```json
{
  "email": "chandu@test.com",
  "password": "123456"
}
```
<img width="1366" height="768" alt="Screenshot (2696)" src="https://github.com/user-attachments/assets/06aaf665-42b5-4acf-9196-e121a1710e76" />

---

##  Category APIs

### Create Category (Admin only)

POST /api/categories

Header:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "name": "Food",
  "type": "expense"
}
```
<img width="1366" height="768" alt="Screenshot (2697)" src="https://github.com/user-attachments/assets/17cc96f4-1830-4565-9841-005ee2d35201" />

---

### Get Categories

GET /api/categories

Header:

```
Authorization: Bearer <token>
```
<img width="1366" height="768" alt="Screenshot (2698)" src="https://github.com/user-attachments/assets/55ef9ed8-4ded-4aa8-bccf-e00c21818cdd" />

---

## Transaction APIs

### Create Transaction

POST /api/transactions

Header:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "amount": 500,
  "type": "expense",
  "categoryId": "CATEGORY_ID",
  "date": "2026-04-03",
  "notes": "Lunch"
}
```
<img width="1366" height="768" alt="Screenshot (2699)" src="https://github.com/user-attachments/assets/d5798cc7-fcfd-46ff-995f-5a8f272d376f" />

---

### Get Transactions

GET /api/transactions

Header:

```
Authorization: Bearer <token>
```

Query Params:

* page
* limit
* type
* categoryId
* startDate
* endDate

<img width="1366" height="768" alt="Screenshot (2700)" src="https://github.com/user-attachments/assets/998dd1f1-b36b-4d36-b3ff-d791be005d30" />

---

### Update Transaction

PUT /api/transactions/:id

Header:

```
Authorization: Bearer <token>
```
<img width="1366" height="768" alt="Screenshot (2701)" src="https://github.com/user-attachments/assets/a78a6a63-1027-48a9-bfa4-c424c06c732b" />

---

### Delete Transaction

DELETE /api/transactions/:id

Header:

```
Authorization: Bearer <token>
```
<img width="1366" height="768" alt="Screenshot (2702)" src="https://github.com/user-attachments/assets/649c2002-1d42-4234-b556-56c252268514" />

---

##  Dashboard APIs

### Summary

GET /api/dashboard/summary

Header:

```
Authorization: Bearer <token>
```
<img width="1366" height="768" alt="Screenshot (2703)" src="https://github.com/user-attachments/assets/8cf20224-e070-4f49-86ab-019739ac5dfa" />

---

### Trends

GET /api/dashboard/trends

Header:

```
Authorization: Bearer <token>
```
<img width="1366" height="768" alt="Screenshot (2704)" src="https://github.com/user-attachments/assets/7714008b-df50-4d71-8955-3508f0971498" />

---

##  Notes

* All APIs return JSON responses
* Role-based access control is enforced using middleware
* Input validation is handled using Zod
* Proper HTTP status codes are returned for success and errors
* Pagination and filtering are supported in transaction APIs

---

##  How to Run

1. Install dependencies:

```
npm install
```

2. Start server:

```
npm run dev
```

3. Access API:

```
http://localhost:5000
```

4. Swagger Docs:

```
http://localhost:5000/api-docs
```
