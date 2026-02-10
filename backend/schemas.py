from pydantic import BaseModel

class LoanData(BaseModel):
    person_age: float
    person_income: float
    person_home_ownership: int
    person_emp_length: float
    loan_intent: int
    loan_grade: int
    loan_amnt: float
    loan_int_rate: float
    loan_percent_income: float
    cb_person_default_on_file: int
    cb_person_cred_hist_length: float
