from fastapi import FastAPI, HTTPException
import numpy as np
import pandas as pd
from backend.model_loader import model
from backend.schemas import LoanData
from fastapi.middleware.cors import CORSMiddleware
import traceback


app = FastAPI(title="FinGuard AI API", description="Credit Risk Prediction Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "FinGuard AI API Running"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "FinGuard AI"}

@app.post("/predict")
def predict(data: LoanData):
    try:
        df = pd.DataFrame([{
            "person_age": data.person_age,
            "person_income": data.person_income,
            "person_home_ownership": data.person_home_ownership,
            "person_emp_length": data.person_emp_length,
            "loan_intent": data.loan_intent,
            "loan_grade": data.loan_grade,
            "loan_amnt": data.loan_amnt,
            "loan_int_rate": data.loan_int_rate,
            "loan_percent_income": data.loan_percent_income,
            "cb_person_default_on_file": data.cb_person_default_on_file,
            "cb_person_cred_hist_length": data.cb_person_cred_hist_length
        }])

        prediction = model.predict(df)[0]
        prob = model.predict_proba(df)[0][1]

        return {
            "risk_prediction": int(prediction),
            "probability": float(prob),
            "status": "success"
        }
    except Exception as e:
        print(f"Prediction Error: {e}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Internal server error during prediction.")
