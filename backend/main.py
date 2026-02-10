from fastapi import FastAPI
import numpy as np
from model_loader import model
from schemas import LoanData
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

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

@app.post("/predict")
def predict(data: LoanData):
    arr = np.array([[ 
        data.person_age,
        data.person_income,
        data.person_home_ownership,
        data.person_emp_length,
        data.loan_intent,
        data.loan_grade,
        data.loan_amnt,
        data.loan_int_rate,
        data.loan_percent_income,
        data.cb_person_default_on_file,
        data.cb_person_cred_hist_length
    ]])

    prediction = model.predict(arr)[0]
    prob = model.predict_proba(arr)[0][1]

    return {
        "risk_prediction": int(prediction),
        "probability": float(prob)
    }
