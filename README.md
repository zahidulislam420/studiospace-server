# StudioSpace Server API

Production-ready backend API service for **StudioSpace**, the peer-to-peer workspace & production studio sharing platform. Built with Express.js, MongoDB native driver, TypeScript, and JWT authentication via `jose`.

---

## 🛠 Tech Stack

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **Database:** MongoDB (Native Driver with connection pooling)
- **Authentication:** JWT (`jose` HS256) via HTTPOnly cookie or Bearer authorization
- **TypeScript:** Strict type-checking and automated builds
- **Development:** `tsx watch` for hot-reloading

---

## 🚀 Environment Variables

Copy `.env.example` to `.env` and fill in the required credentials:

```bash
cp .env.example .env
```

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | HTTP server port | `5000` |
| `DBUSER` | MongoDB Atlas username | `zahidulislamcell_db_user` |
| `DBPASSWORD` | MongoDB Atlas password | `<secret>` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://${DBUSER}:${DBPASSWORD}@studiospace-db.ngfnd3z.mongodb.net/studiospace?retryWrites=true&w=majority` |
| `JWT_SECRET` | Shared JWT signing secret | `your_shared_jwt_secret_min32chars` |
| `CLIENT_URL` | Allowed Next.js client origin | `http://localhost:3000` |
| `NODE_ENV` | Runtime environment | `development` / `production` |

---

## 📦 Scripts

- `npm run dev`: Start local development server with hot reload (`tsx watch src/index.ts`)
- `npm run build`: Compile TypeScript to `dist/`
- `npm run start`: Launch compiled production server (`node dist/index.js`)
- `npm run seed`: Populate database with 12 authentic creative studios and initial reviews

---

## 📡 API Endpoints Reference

### Health Checks
- `GET /` — API root status and server timestamp
- `GET /api/health` — Uptime and health check

### Studios
- `GET /api/studios` — Explore studios with query filters (`search`, `category`, `capacity`, `minPrice`, `maxPrice`, `sortBy`, `page`, `limit`)
- `GET /api/studios/featured` — Top-rated spotlight studios for home page
- `GET /api/studios/mine` — Host listings for currently authenticated user *(Protected)*
- `GET /api/studios/:id` — Single studio detailed specs, equipment, and location
- `POST /api/studios` — Publish a new creative workspace *(Protected)*
- `PUT /api/studios/:id` — Update listing details *(Protected, Host Ownership Guard)*
- `DELETE /api/studios/:id` — Remove listing from directory *(Protected, Host Ownership Guard)*

### Bookings
- `GET /api/bookings/slots?studioId=...&date=...` — Query booked time intervals for a given day
- `POST /api/bookings` — Request a booking slot with overlap validation *(Protected)*
- `GET /api/bookings/mine` — Creator booking history and upcoming slots *(Protected)*
- `GET /api/bookings/host` — Inbound requests and confirmed bookings for host spaces *(Protected)*
- `PATCH /api/bookings/:id/cancel` — Cancel a booking *(Protected, Creator or Host)*
- `PATCH /api/bookings/:id/status` — Update booking status (`Confirmed`, `Completed`, etc.) *(Protected, Host)*

### Reviews
- `GET /api/reviews/:studioId` — List authentic reviews for a studio
- `POST /api/reviews` — Submit a rating (1-5) and review comment *(Protected)*

### Wishlist
- `POST /api/wishlist/toggle` — Add or remove studio from user favorites *(Protected)*
- `GET /api/wishlist/mine` — List all wishlisted studios *(Protected)*
- `GET /api/wishlist/check/:studioId` — Check if a studio is saved by user *(Optional Auth)*

---

## 🛡 Double-Booking Prevention Algorithm

To guarantee zero double-bookings on identical studios and calendar dates, the booking service queries all active (`Confirmed` and `Pending`) slots:

```javascript
existing.startTime < new.endTime && existing.endTime > new.startTime
```

If any overlap is detected, the API immediately halts creation and returns `409 Conflict` with the exact conflicting window.

---

## ☁️ Production Deployment (Render)

1. Create a new **Web Service** on [Render](https://render.com).
2. Connect the `studiospace-server` repository.
3. Configure settings:
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   - `PORT`: `5000`
   - `DBUSER`, `DBPASSWORD`, `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`: Your Vercel frontend URL
   - `NODE_ENV`: `production`
