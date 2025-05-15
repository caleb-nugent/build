# Furniture Vision

An AI-powered application that analyzes furniture images and generates detailed woodworking plans.

## Features

- Upload images of furniture
- AI-powered analysis using GPT-4 Vision
- Detailed woodworking plans generation
- Material lists and step-by-step instructions
- Dimensions and joinery recommendations

## Setup

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

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Upload an image of a piece of furniture
3. Click "Analyze Furniture"
4. Wait for the AI to generate detailed woodworking plans
5. Review the generated plans, including:
   - Required materials and tools
   - Step-by-step construction process
   - Approximate dimensions
   - Joinery methods
   - Finishing recommendations

## Technologies Used

- Frontend: React, TypeScript, Chakra UI
- Backend: FastAPI, Python
- AI: OpenAI GPT-4 Vision API

## Note

This application requires an OpenAI API key with access to the GPT-4 Vision API. Make sure you have the appropriate API access before setting up the application. 