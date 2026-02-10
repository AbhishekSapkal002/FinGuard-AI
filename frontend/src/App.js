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
