import React, { useState } from "react";
import axios from "axios";

function App() {

  const [form, setForm] = useState({
    person_age: "",
    person_income: "",
    person_home_ownership: "",
    person_emp_length: "",
    loan_intent: "",
    loan_grade: "",
    loan_amnt: "",
    loan_int_rate: "",
    loan_percent_income: "",
    cb_person_default_on_file: "",
    cb_person_cred_hist_length: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://YOUR-RENDER-URL/predict",
        form
      );
      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Error sending data");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f4f6f8"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "400px"
      }}>
        <h2 style={{ textAlign: "center" }}>FinGuard AI</h2>
        <p style={{ textAlign: "center", color: "gray" }}>
          Credit Risk Prediction
        </p>

        {Object.keys(form).map((key) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "12px" }}>{key}</label>
            <input
              name={key}
              placeholder={key}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Predict Risk
        </button>

        {result && (
          <div style={{
            marginTop: "20px",
            padding: "15px",
            background: "#eef2ff",
            borderRadius: "5px"
          }}>
            <h3>Prediction: {result.risk_prediction}</h3>
            <h3>Probability: {result.probability}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
