import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const apiEndpoint =
      "https://www.7ader.net/GeneralApiV11/api/dashboard/token";
    const requestBody = {
      ConnectionStringName: "TeleWare",
      SpParams: {
        username: username,
        password: password,
      },
    };

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        localStorage.setItem("ut", data.token);
        localStorage.setItem("userID", data.data[0].userID);
        navigate("/data");
      })
      .catch(() => {
        setIsLoading(false);
        alert("User Name Or Password Wrong");
      });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="logo">تسجيل الدخول</div>
          <div className="form">
            <div className="inputGroup">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="اسم الحساب"
              />
            </div>

            <div className="inputGroup">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" كلمة السر"
              />
            </div>
          </div>
          <div className="button">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" size="sm" role="status" />
              ) : (
                "تسجيل"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
