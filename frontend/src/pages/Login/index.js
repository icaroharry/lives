import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function() {
  const [id, setId] = useState("");
  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("companyId", id);
      localStorage.setItem("companyName", response.data.name);

      history.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Falha no login, tente novamente.");
    }
  };
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be the heroes logo" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input
            placeholder="Sua Id"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
