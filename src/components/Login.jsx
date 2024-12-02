import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(email, password); 
      navigate("/"); 
    } catch (error) {
      toast.error("Login failed, please check your credentials!");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-4">Testify - Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
            </form>
            <div className="mt-3 text-center">
              <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
