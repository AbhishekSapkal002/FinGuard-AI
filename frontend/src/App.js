import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  User, Briefcase, Home, Calendar, Target, Award, 
  DollarSign, Percent, AlertCircle, Clock
} from "lucide-react";
import "./App.css";

const FORM_FIELDS = {
  person_age: { label: "Age", icon: User },
  person_income: { label: "Annual Income ($)", icon: DollarSign },
  person_home_ownership: { label: "Home Ownership", icon: Home, type: "select", options: [{l: 'Mortgage', v: 0}, {l: 'Other', v: 1}, {l: 'Own', v: 2}, {l: 'Rent', v: 3}] },
  person_emp_length: { label: "Employment Length (Years)", icon: Briefcase },
  loan_intent: { label: "Loan Intent", icon: Target, type: "select", options: [{l: 'Debt Consolidation', v: 0}, {l: 'Education', v: 1}, {l: 'Home Improvement', v: 2}, {l: 'Medical', v: 3}, {l: 'Personal', v: 4}, {l: 'Venture', v: 5}] },
  loan_grade: { label: "Loan Grade", icon: Award, type: "select", options: [{l: 'A', v: 0}, {l: 'B', v: 1}, {l: 'C', v: 2}, {l: 'D', v: 3}, {l: 'E', v: 4}, {l: 'F', v: 5}, {l: 'G', v: 6}] },
  loan_amnt: { label: "Loan Amount ($)", icon: DollarSign },
  loan_int_rate: { label: "Interest Rate (%)", icon: Percent, step: "0.1" },
  loan_percent_income: { label: "Loan to Income Ratio (0.0 to 1.0)", icon: Percent, step: "0.01" },
  cb_person_default_on_file: { label: "Historical Default", icon: AlertCircle, type: "select", options: [{l: 'No', v: 0}, {l: 'Yes', v: 1}] },
  cb_person_cred_hist_length: { label: "Credit History Length (Years)", icon: Clock }
};

function App() {
  const [form, setForm] = useState({
    person_age: "",
    person_income: "",
    person_home_ownership: 0,
    person_emp_length: "",
    loan_intent: 0,
    loan_grade: 0,
    loan_amnt: "",
    loan_int_rate: "",
    loan_percent_income: "",
    cb_person_default_on_file: 0,
    cb_person_cred_hist_length: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg("");
    setResult(null);

    const payload = {};
    for (const key in form) {
      if (form[key] === "") {
        setErrorMsg(`Please fill in all fields before predicting. Missing: ${FORM_FIELDS[key].label}`);
        setLoading(false);
        return;
      }
      payload[key] = Number(form[key]);
    }

    try {
      const res = await axios.post("/predict", payload);
      setResult(res.data);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.detail) {
        let msg = "Validation Error: ";
        if (Array.isArray(err.response.data.detail)) {
          msg += err.response.data.detail.map(e => e.msg).join(", ");
        } else {
          msg += err.response.data.detail;
        }
        setErrorMsg(msg);
      } else {
        setErrorMsg("Error communicating with the backend. Is it running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <div className="glass-card-header">
          <h2>FinGuard AI</h2>
          <p>Intelligent Credit Risk Prediction</p>
        </div>

        <div className="form-grid">
          {Object.keys(form).map((key) => {
            const field = FORM_FIELDS[key];
            const Icon = field.icon;
            return (
              <div key={key} className="input-group">
                <label>
                  <Icon /> {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="modern-select"
                  >
                    {field.options.map(opt => (
                      <option key={opt.v} value={opt.v}>{opt.l}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={key}
                    step={field.step || "1"}
                    placeholder={`Enter ${field.label}`}
                    value={form[key]}
                    onChange={handleChange}
                    className="modern-input"
                  />
                )}
              </div>
            );
          })}

          <button
            onClick={handleSubmit}
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Analyzing Risk..." : "Predict Risk"}
          </button>
          
          {errorMsg && (
            <div className="error-message">
              {errorMsg}
            </div>
          )}

          {result && (
            <div className={`result-card ${result.risk_prediction === 1 ? 'high-risk' : ''}`}>
              <div className="gauge-container">
                <CircularProgressbar
                  value={result.probability * 100}
                  text={`${(result.probability * 100).toFixed(1)}%`}
                  styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    pathColor: result.risk_prediction === 1 ? '#EF4444' : '#10B981',
                    textColor: 'var(--text-primary)',
                    trailColor: 'rgba(255,255,255,0.1)',
                  })}
                />
              </div>
              <h3>{result.risk_prediction === 1 ? 'High Risk ⚠️' : 'Low Risk ✅'}</h3>
              <p>{result.risk_prediction === 1 ? 'This applicant has a high probability of defaulting.' : 'This applicant is in good standing and unlikely to default.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
