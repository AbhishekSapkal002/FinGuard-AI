# FinGuard AI

**FinGuard AI** is a complete, full-stack application for intelligent credit risk prediction. This project utilizes a sophisticated Scikit-Learn `RandomForestClassifier` served by a robust `FastAPI` backend, coupled with a beautiful, responsive `React` frontend that features a modern *"Glassmorphism"* UI aesthetic.

## Features

* **High-Accuracy ML Model:** Predicts loan default probability based on 11 distinct applicant features.
* **Modern Frontend:** Built with React. Features dark mode gradients, interactive micro-animations, and a highly responsive grid layout to provide an excellent user experience.
* **Robust Backend:** A lightning-fast FastAPI endpoint with strict `Pydantic` data validation to ensure the ML model receives safe and correct inputs.
* **Developer Ready:** Includes API health-checks, clear error logging, and easy-to-use setup scripts.

---

## 🛠️ Technology Stack

| Component | Tech Used |
|-----------|-----------|
| **Frontend** | React, Vanilla CSS, Axios |
| **Backend** | Python, FastAPI, Uvicorn, Pydantic |
| **Machine Learning** | Scikit-Learn, Joblib, NumPy |

---

## 🚀 Getting Started

### 1. Start the Backend API

You must have Python installed. The backend runs on `http://127.0.0.1:8000`.

```bash
# Navigate to the project root directory
cd FinGuard-AI

# (Optional but recommended) Activate your virtual environment
# e.g., on Windows: venv\Scripts\activate

# Install requirements if you haven't yet
pip install -r requirements.txt

# Start the FastAPI server
uvicorn backend.main:app --reload
```
*Note: You can view the interactive API docs by navigating to `http://127.0.0.1:8000/docs` in your browser!*

### 2. Start the Frontend Application

The frontend runs on `http://localhost:3000`. Make sure you have NodeJS and npm installed.

```bash
# Open a NEW terminal window and navigate to the frontend directory
cd FinGuard-AI/frontend

# Install node modules if you haven't yet
npm install

# Start the React development server
npm start
```

---

## 🏗️ Project Structure

```text
FinGuard-AI/
├── backend/            # FastAPI source code
│   ├── main.py         # API Endpoints (e.g. /health, /predict)
│   ├── schemas.py      # Pydantic data validation rules
│   └── model_loader.py # Logic for deserializing the model
├── frontend/           # React application code
│   ├── public/         # Static assets
│   └── src/            # UI components, App.js, and CSS styles
├── models/             # Contains the pre-trained credit_model.pkl
└── requirements.txt    # Python dependencies
```

## 🔒 Security & Validation
The backend heavily utilizes `pydantic` schemas. Inputs like `person_age` are constrained (18-120), and `loan_amount` must be greater than zero. These guarantee data integrity before hitting the model inference runtime.

