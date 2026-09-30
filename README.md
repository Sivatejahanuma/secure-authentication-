# SECUREX — Production Secure User Authentication Platform

A modern, full-stack cybersecurity-themed authentication platform built with **Node.js, Express, MongoDB, React, Tailwind CSS, and Framer Motion**. Engineered with enterprise security standards, defensive programming patterns, and zero-trust access control.

---

## 🛡️ Security Architecture & Highlights

- **Bcrypt Password Hashing**: Passwords are one-way hashed with **12 salt rounds** before storage. Plaintext passwords are never saved, logged, or cached.
- **HMAC-SHA256 (HS256) JWT**: Stateless tokens strictly signed and verified using `HS256` with expiration timestamps (`24h` default).
- **Zero Credential Leaks**: Password fields have `select: false` in Mongoose; both `toJSON` and `toObject` serialization hooks automatically strip `password` and `__v`.
- **Strict Input Validation**: Validated via `express-validator` (enforcing email normalization, minimum 8 characters, uppercase, lowercase, numeric, and special character rules).
- **Rate Limiting**: Defends against brute-force attacks by limiting `/api/auth/*` to 100 requests per 15-minute window.
- **Security HTTP Headers**: Hardened with Helmet for secure HTTP headers.
- **Zero-Config Database**: Connects to local MongoDB with an automatic fallback to an embedded in-memory MongoDB instance for immediate local development.

---

## 📋 API Endpoints

| Method | Endpoint | Access | Description | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Service health & status check | `200 OK` |
| `POST` | `/api/auth/register` | Public | Register new user with password hashing | `201 Created` / `400` / `409` |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue signed JWT | `200 OK` / `400` / `401` |
| `GET` | `/api/auth/me` | Protected | Retrieve authenticated user profile | `200 OK` / `401 Unauthorized` |
| `POST` | `/api/auth/logout` | Public | Invalidate client session | `200 OK` |

---

## ⚙️ Environment Configuration

Copy the example environment file into `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

Default variables in `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/secure_auth_db
JWT_SECRET=your_secure_random_64_char_secret_key
CLIENT_URL=http://localhost:5173
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

> **Note:** `.env` is explicitly ignored by `.gitignore` to prevent credential exposure in version control.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
# Install root orchestration dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Run in Development Mode
From the project root:
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

### 3. Run Automated Security & API Tests
```bash
npm run test:backend
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔒 Security Audit Checklist

All 18 core requirements have been verified:
- [x] Registration uses bcrypt to hash passwords
- [x] Passwords are never stored in plaintext
- [x] Password hashes are never returned in API responses
- [x] Login compares passwords with bcrypt hashes
- [x] Real JWT issued on authentication
- [x] Expiration time enforced on JWT
- [x] Secret key loaded exclusively from environment variables
- [x] `/api/auth/me` protected by Bearer token middleware
- [x] Missing or tampered JWT returns HTTP 401
- [x] Strict input validation and duplicate email handling
- [x] `.env` excluded from git tracking
"# secure-authentication-" 
