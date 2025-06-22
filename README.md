# 📄 Library Management REST API

A complete backend system built with **TypeScript**, **Express.js**, **MongoDB**, and **Mongoose** for managing books in a library.

## ⚡ Features

* CRUD operations for books
* Borrowing system
* Real-time availability tracking
* MongoDB aggregation summary for borrowed books
* Fully RESTful endpoints
* Environment-based configuration

---

## 📊 Tech Stack

* **Backend**: Node.js, Express.js, TypeScript
* **Database**: MongoDB with Mongoose
* **Tooling**: ts-node-dev, dotenv

---

## 🗓️ API Endpoints

### 1. Create Book

`POST /api/books`

**Request Body**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

**Success Response**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ...bookDetails }
}
```

---

### 2. Get All Books

`GET /api/books`

**Query Params**

* `filter`: Genre (e.g., FICTION, SCIENCE)
* `sortBy`: Any field (e.g., `createdAt`)
* `sort`: `asc` | `desc`
* `limit`: Number of results (default: 10)

**Example**
`/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

**Response**

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ ...books ]
}
```

---

### 3. Get Book by ID

`GET /api/books/:bookId`

**Response**

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": { ...bookDetails }
}
```

---

### 4. Update Book

`PUT /api/books/:bookId`

**Request Body** (e.g.)

```json
{
  "copies": 50
}
```

**Response**

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ...updatedBook }
}
```

---

### 5. Delete Book

`DELETE /api/books/:bookId`

**Response**

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### 6. Borrow a Book

`POST /api/borrow`

**Request Body**

```json
{
  "book": "<bookObjectId>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Response**

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ...borrowRecord }
}
```

---

### 7. Borrowed Summary (Aggregation)

`GET /api/borrow`

**Purpose**: Summary of borrowed books per title.

**Response**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## 📤 Environment Variables

Create a `.env` file in root with:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=<your-mongodb-url>
```

---

## ⚙️ Run Project Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Serve compiled JS (after build)
node dist/server.js
```

---

## ✉ Error Handling Format

Validation errors follow this consistent format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "field": {
        "message": "Error message",
        ...
      }
    }
  }
}
```

---

## 🚀 Deployment

To deploy on platforms like **Render** or **Vercel (API)**:

* Build: `npm run build`
* Ensure entry point is `dist/server.js`
* Set environment variables in the platform settings

