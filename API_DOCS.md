# API Documentation

This document provides details about all available API endpoints in the Finance Dashboard Backend.

---

## Base URL

http://localhost:5000

---

## Authentication

Protected routes require:

Authorization: Bearer <token>

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

---

## Category APIs

### Create Category (Admin only)

POST /api/categories

Body:

```json
{
  "name": "Food",
  "type": "expense"
}
```

---

### Get Categories

GET /api/categories

---

##  Transaction APIs

### Create Transaction

POST /api/transactions

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

---

### Get Transactions

GET /api/transactions

Query Params:

* page
* limit
* type
* categoryId
* startDate
* endDate

---

### Update Transaction

PUT /api/transactions/:id

---

### Delete Transaction

DELETE /api/transactions/:id

---

## Dashboard APIs

### Summary

GET /api/dashboard/summary

---

### Trends

GET /api/dashboard/trends

---

## Notes

* All APIs return JSON responses
* Role-based access is enforced
* Validation errors return proper status codes
