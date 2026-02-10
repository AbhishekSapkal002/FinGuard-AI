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
        "http://127.0.0.1:8000/predict",
        form
      );
      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Error sending data");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>FinGuard AI - Credit Risk</h2>

      {Object.keys(form).map((key) => (
        <div key={key}>
          <input
            name={key}
            placeholder={key}
            onChange={handleChange}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Predict</button>

      {result && (
        <div>
          <h3>Prediction: {result.risk_prediction}</h3>
          <h3>Probability: {result.probability}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
