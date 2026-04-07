from pydantic import BaseModel, Field

class LoanData(BaseModel):
    person_age: float = Field(..., ge=18, le=120, description="Age must be between 18 and 120")
    person_income: float = Field(..., ge=0, description="Income cannot be negative")
    person_home_ownership: int
    person_emp_length: float = Field(..., ge=0, le=100, description="Employment length (0-100 years)")
    loan_intent: int
    loan_grade: int
    loan_amnt: float = Field(..., gt=0, description="Loan amount must be strictly greater than zero")
    loan_int_rate: float = Field(..., ge=0, le=100, description="Interest rate percentage (0-100)")
    loan_percent_income: float = Field(..., ge=0, le=1, description="Loan as a percentage of income (0.0 to 1.0)")
    cb_person_default_on_file: int
    cb_person_cred_hist_length: float = Field(..., ge=0, le=100, description="Credit history length (0-100 years)")
