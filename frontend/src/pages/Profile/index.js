import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [lives, setLives] = useState([]);

  const history = useHistory();

  const companyName = localStorage.getItem("companyName");
  const companyId = localStorage.getItem("companyId");

  const handleDeleteLive = async id => {
    try {
      await api.delete(`lives/${id}`, {
        headers: {
          Authorization: companyId
        }
      });

      setLives(lives.filter(live => live.id !== id));
    } catch (err) {
      alert("Erro ao excluir live.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    history.push("/");
  };

  useEffect(() => {
    api
      .get("company/profile", {
        headers: {
          Authorization: companyId
        }
      })
      .then(response => {
        setLives(response.data);
      });
  }, [companyId]);

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {companyName}</span>
        <Link className="button" to="/lives/new">
          Cadastrar nova live
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Lives cadastradas</h1>
      <ul>
        {lives.map(live => (
          <li key={live.id}>
            <strong>TÍTULO:</strong>
            <p>{live.title}</p>

            <strong>DESCRIÇÃO: </strong>
            <p>{live.description}</p>

            <strong>DATA E HORA:</strong>
            <p>{live.date}</p>

            <button>
              <FiTrash2
                size={20}
                color="#a8a8b3"
                onClick={() => handleDeleteLive(live.id)}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
