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

Create a `.env.production` file in the root directory:

```env
VITE_API_BASE_URL=https://your-backend-url/api
VITE_APP_NAME="Predictive Maintenance System"
VITE_ENV=production
```

### 4. Build for Production

```bash
npm run build:prod
```

### 5. Dockerization

Multi-stage Dockerfile is provided. To build and run:

```bash
docker build -t pm-frontend .
docker run -d -p 8080:80 --name pm-frontend pm-frontend
```

### 6. Google Cloud Run Deployment

You can deploy directly using Cloud Run:

```bash
gcloud run deploy aegis --source . --project=<your-gcp-project> --region=asia-southeast2 --port=80 --allow-unauthenticated
```

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
