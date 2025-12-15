# Predictive Maintenance Frontend

This is a React 19 + Vite 4 frontend for the Predictive Maintenance System.

## Features

- Modern React (v19) with Vite for fast builds
- Tailwind CSS + DaisyUI for UI
- Recharts for data visualization
- API integration via Axios
- Environment variable support for production
- Dockerized for easy deployment

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Development

```bash
npm run dev
```

### 3. Environment Variables

This project uses two environment files:

- **`.env`** – Used for local development (`npm run dev`)
- **`.env.production`** – Used for production builds (`npm run build:prod`)

#### Development (`.env`)

Copy from `.env.example` and adjust as needed:

```bash
cp .env.example .env
```

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME="Predictive Maintenance System"
VITE_ENV=development
```

#### Production (`.env.production`)

Create a `.env.production` file for production builds:

```env
VITE_API_BASE_URL=https://your-backend-url/api
VITE_APP_NAME="Predictive Maintenance System"
VITE_ENV=production
```

> **Note:** Any change to `.env.production` requires a rebuild (`npm run build:prod`).

### 4. Build for Production

```bash
npm run build:prod
```

### 5. Dockerization

Multi-stage Dockerfile is provided. To build and run locally:

```bash
docker build -t frontend-app .
docker run -d -p 8080:80 --name frontend-app frontend-app
```

### 6. Google Cloud Run Deployment

#### Step 1: Build Docker Image

```bash
docker build -t frontend-app .
```

#### Step 2: Tag for Google Container Registry (GCR)

```bash
docker tag frontend-app gcr.io/<your-gcp-project>/aegis-frontend
```

#### Step 3: Push to GCR

```bash
docker push gcr.io/<your-gcp-project>/aegis-frontend
```

#### Step 4: Deploy to Cloud Run

```bash
gcloud run deploy aegis \
  --image gcr.io/<your-gcp-project>/aegis-frontend \
  --project=<your-gcp-project> \
  --region=asia-southeast2 \
  --port=80 \
  --allow-unauthenticated
```

> **Tip:** Replace `<your-gcp-project>` with your actual GCP project ID (e.g., `gen-lang-client-0256469220`).

## SPA Routing

Nginx is configured to handle React Router refreshes with:

```
location / {
  try_files $uri $uri/ /index.html;
}
```

## Troubleshooting

- **Linux Case Sensitivity:** Ensure all import paths match the actual filename casing (e.g., `Card.jsx` → `@/components/ui/Card`).
- **Node Version:** Vite requires Node.js 20+ for builds.
- **Environment Variables:** Any change to `.env.production` requires a rebuild.

## Folder Structure

```
src/
  components/
    ui/
      Card.jsx, Button.jsx, ...
    dashboard/
    machine/
    recommendations/
  pages/
  hooks/
  api/
  data/
```
