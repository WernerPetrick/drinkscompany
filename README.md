# DrinksCompany QR Code Competition Demo

## Project Structure

```
├── backend/           # Express.js server
└── frontend/         # React + Vite application
```

## Features

- QR code generation for competition entries
- Token-based validation system
- Single-use entry validation
- Integration with Supabase database
- Mobile-responsive design

## Getting Started

### Prerequisites

- Node.js
- npm
- Supabase account

##### Supabase

Run this SQL in the Supabase SQL Editor:

```
create table entry_tokens (
  id uuid default gen_random_uuid() primary key,
  token text unique not null,
  used boolean default false,
  created_at timestamp default now()
);
```

#### Installation

- Clone the repository
- Install dependencies:

```
# Frontend
cd frontend
npm install

# Backend 
cd backend
npm install
```

- Configure environment variables in both frontend and backend `.env` files

#### Development

Run the frontend development server:

```bash
cd frontend
npm run dev
```

Run the backend development server:

```bash
cd backend
node server.js
```

## Token Generation

Generate new competition tokens:

```node
node frontend/generateTokens.js
```

Generate QR codes for existing tokens:

```node
node frontend/generateQRCodes.js
```

#### API Endpoints

```bash
GET /api/enter
Validates and processes competition entries using unique tokens.
```

visit `http://localhost:5173/enter?token={token}`
