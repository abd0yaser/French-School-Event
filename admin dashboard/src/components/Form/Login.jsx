import "./Login.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if (localStorage.getItem("ut")) navigate("/data");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const apiEndpoint = "https://api.shopimix.com/api/general";
    const requestBody = {
      ConnectionStringName: "FrenshSchool",
      StoredProcedureName: "Unauthorized.userLogin",
      SpParams: {
        username: username,
        password: password,
      },
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
      }

      const data = await response.json();
      setIsLoading(false);

      localStorage.setItem("ut", data.table1[0].token);

      navigate(`/data?${search}`);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="LginForm">
        <form onSubmit={handleSubmit}>
          <div className="logo"> Connexion</div>
          <div className="form">
            <div className="inputGroup">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur "
              />
            </div>

            <div className="inputGroup">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" Mot de passe "
              />
            </div>
          </div>
          <div className="button">
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" size="sm" role="status" />
              ) : (
                "Se connecter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
