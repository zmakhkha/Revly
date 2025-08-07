from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

server = FastAPI()

server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"],
)

import crud
