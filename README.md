# Work Readiness Program — Brimbank Tech School

A full-stack interactive web application delivering 8 work readiness training modules for Year 9–12 students, powered by the Anthropic Claude AI API.

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- An Anthropic API key (see SETUP.md)

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Stephen-Mark/Job-Readiness-Program.git
cd Job-Readiness-Program
```

### 2. Install all dependencies

```bash
npm run install:all
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### 4. Start the development server

```bash
npm run dev
```

This starts:
- **Backend** (Express): http://localhost:3001
- **Frontend** (Vite/React): http://localhost:5173

Open http://localhost:5173 in your browser.

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes (for AI features) |
| `PORT` | Express server port | No (default: 3001) |
| `NODE_ENV` | Environment mode | No (default: development) |

## Production Build (local)

```bash
npm run build   # Builds React frontend to client/dist/
npm start       # Serves the built app on port 3001
```

Visit http://localhost:3001

## Project Structure

```
├── client/          # React + Vite frontend
│   └── src/
│       ├── pages/   # Route-level page components
│       ├── components/  # Reusable UI components
│       ├── hooks/   # Custom React hooks
│       └── data/    # Static module data (client-side)
├── server/          # Express backend
│   ├── routes/      # API route handlers
│   └── data/        # Module content data
├── render.yaml      # Render deployment config
└── .env.example     # Environment variable template
```

## Deployment to Render

1. Push to GitHub
2. Connect your GitHub repo to Render
3. Render auto-detects `render.yaml` and configures the service
4. Set `ANTHROPIC_API_KEY` in Render's Environment Variables dashboard

See SETUP.md for detailed API key instructions.

## Modules

| # | Title | Icon |
|---|---|---|
| 1 | Engaging with an Employer | 🤝 |
| 2 | Workplace Etiquette | 💼 |
| 3 | Skills, Passions & Career Pathways | 🌟 |
| 4 | Digital Literacy | 💻 |
| 5 | Communication Skills | 🗣️ |
| 6 | Organisational Skills | 📋 |
| 7 | Critical Thinking & Problem Solving | 🧠 |
| 8 | Mock Interviews | 🎤 |
