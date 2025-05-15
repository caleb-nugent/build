# Development Guide

This guide is for developers who want to run the application locally or contribute to the project.

## Prerequisites

- Node.js 18+
- Python 3.10+
- Docker (optional)

## Local Development Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file with your OpenAI API key:
```bash
OPENAI_API_KEY=your_api_key_here
```

5. Start the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
VITE_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

## Docker Setup (Alternative)

1. Make sure Docker and Docker Compose are installed
2. Create a `.env` file in the root directory with your OpenAI API key
3. Run:
```bash
docker-compose up --build
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## Repository Structure

```
├── .github/
│   └── workflows/        # CI/CD configurations
├── backend/
│   ├── main.py          # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── Dockerfile       # Backend container configuration
├── frontend/
│   ├── src/            # React application source
│   ├── package.json    # Node.js dependencies
│   └── Dockerfile      # Frontend container configuration
└── docs/               # Documentation
```

## Environment Variables

### Backend
- `OPENAI_API_KEY`: Your OpenAI API key

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

## Deployment

The application is automatically deployed when changes are pushed to the main branch:
- Frontend → GitHub Pages
- Backend → Railway

To deploy manually or to a different platform, check the CI/CD configuration in `.github/workflows/ci.yml`. 