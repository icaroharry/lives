import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "./styles.css";

const companyId = localStorage.getItem("companyId");

export default function NewLive() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const history = useHistory();

  const handleNewLiveSubmit = async e => {
    e.preventDefault();

    try {
      await api.post(
        "/lives",
        {
          title,
          description,
          date
        },
        {
          headers: {
            Authorization: companyId
          }
        }
      );

      history.push("/profile");
    } catch (err) {
      alert("Ocorreu um erro ao cadastrar a live!");
    }
  };

  return (
    <div className="new-live-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1>Cadastrar nova live</h1>
          <p>
            Descreva como será a sua live para que as pessoas saibam o que
            esperar :)
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="e02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewLiveSubmit}>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título da live"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="Data e hora"
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
