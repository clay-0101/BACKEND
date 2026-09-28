# Stitchery — MERN E-Commerce App

A full-stack e-commerce application with JWT authentication (access + refresh tokens), product CRUD with image uploads, and a React frontend styled with Tailwind CSS.

## Tech Stack

**Frontend (`CLIENT`)**
- React 19 + Vite
- Redux Toolkit (UI state: auth session, modals, selected product)
- TanStack Query (server state: fetching/caching products)
- React Router
- React Hook Form
- Tailwind CSS
- Axios

**Backend (`SERVER`)**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (access token + rotating refresh token via httpOnly cookie)
- Multer + ImageKit (image uploads/storage)
- bcrypt (password hashing)
- express-validator

## Project Structure

```
E-COMMERCE/
├── CLIENT/          # React frontend
│   └── src/
│       ├── features/    # auth & products (api, state, hooks, ui)
│       ├── pages/        # route-level pages
│       ├── config/       # axios instances
│       └── routes/       # app router
└── SERVER/          # Express backend
    ├── api/          # Vercel serverless entrypoint
    └── src/
        ├── controller/
        ├── routes/
        ├── middlewares/
        ├── models/
        ├── services/     # ImageKit upload/delete
        └── validator/
```

## Features

- User registration & login
- Access token (short-lived, in memory) + refresh token (httpOnly cookie, rotated on every use)
- Auto session restore on page load/refresh
- Product listing with loading skeletons
- Create / update / delete products (auth required), with image upload to ImageKit
- Size & stock management per product
- Responsive UI

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or [Atlas](https://mongodb.com/cloud/atlas))
- An [ImageKit](https://imagekit.io/) account (for image storage)

### 1. Clone the repo
```bash
git clone https://github.com/clay-0101/BACKEND.git
cd BACKEND/E-COMMERCE
```

### 2. Backend setup
```bash
cd SERVER
npm install
```

Create a `.env` file in `SERVER/`:
```env
MONGO_URI=mongodb://localhost:27017/E-COMMERCE
PORT=3000
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
CLIENT_URL=http://localhost:5173
```

Run the server:
```bash
npm run dev
```
Server runs on `http://localhost:3000`.

### 3. Frontend setup
```bash
cd ../CLIENT
npm install
```

Create a `.env` file in `CLIENT/` (only needed for production; local dev uses the Vite proxy):
```env
VITE_API_URL=http://localhost:3000/api
```

Run the frontend:
```bash
npm run dev
```
App runs on `http://localhost:5173`.

## API Overview

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login, sets refresh token cookie |
| POST | `/api/auth/refresh-token` | No (cookie) | Rotate tokens, get new access token |
| POST | `/api/auth/logout` | Yes | Clear session |
| GET | `/api/products` | No | List all products |
| GET | `/api/products/:id` | No | Get single product |
| POST | `/api/products` | Yes | Create product (multipart, images) |
| PUT | `/api/products/:id` | Yes | Update product |
| DELETE | `/api/products/:id` | Yes | Delete product |

## Deployment

Both `CLIENT` and `SERVER` are deployed separately on Vercel (Root Directory set to each folder respectively).

**Backend env vars:** `MONGO_URI`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `IMAGEKIT_PRIVATE_KEY`, `CLIENT_URL` (frontend's production URL — no `PORT` needed on Vercel).

**Frontend env vars:** `VITE_API_URL` (backend's production URL + `/api`).

Both projects include a `vercel.json`:
- `SERVER/vercel.json` routes all requests to the serverless function in `api/index.js`
- `CLIENT/vercel.json` rewrites all routes to `index.html` so client-side routing works on page refresh

## License

ISC
