from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import openai
import os
from dotenv import load_dotenv
from PIL import Image
import io
import base64

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/analyze-furniture")
async def analyze_furniture(file: UploadFile):
    try:
        # Read and validate the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert image to base64
        buffered = io.BytesIO()
        image.save(buffered, format=image.format)
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        # Call GPT-4 Vision API
        response = openai.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Analyze this piece of furniture and provide detailed woodworking plans. Include:\n"
                                  "1. List of required materials and tools\n"
                                  "2. Step-by-step construction process\n"
                                  "3. Approximate dimensions\n"
                                  "4. Joinery methods used\n"
                                  "5. Finishing recommendations"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/{image.format.lower()};base64,{img_str}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=4000
        )
        
        return JSONResponse(content={
            "plans": response.choices[0].message.content,
            "status": "success"
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 