import { v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Livro.module.css";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import LivroForm from "../livro/LivroForm";

function Livro() {
  const { id } = useParams();
  const [livro, setLivro] = useState([]);
  const [services, setServices] = useState([]);
  const [showLivroForm, setShowLivroForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(true);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/livros/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setLivro(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [id]);

  function editPost(livro) {
    setMessage("");

    fetch(`http://localhost:5000/livros/${livro.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLivro(data);
        setShowLivroForm(false);
        setMessage("Livro atualizado!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function createService() {
    setMessage("");

    fetch(`http://localhost:5000/livros/${livro.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((resp) => resp.json())
      .then(() => {
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, valor) {
    setMessage("");

    const servicesUpdated = livro.services.filter(
      (service) => service.id !== id
    );

    const livroUpdated = livro;

    livroUpdated.services = servicesUpdated;
    livroUpdated.valor = parseFloat(livroUpdated.valor) - parseFloat(valor);

    fetch(`http://localhost:5000/livros/${livroUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livroUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLivro(livroUpdated);
        setServices(servicesUpdated);
        setMessage("Livro removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  function toggleLivroForm() {
    setShowLivroForm(!showLivroForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {livro.name ? (
        <div className={styles.livro_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}

            <div className={styles.details_container}>
              <h1>Livro: {livro.name}</h1>
              <button className={styles.btn} onClick={toggleLivroForm}>
                {!showLivroForm ? "Editar Livro" : "Fechar"}
              </button>

              {!showLivroForm ? (
                <div className={styles.livro_info}>
                  <p>
                    <span>Categoria:</span> {livro.category.name}
                  </p>

                  <p>
                    <span>Autor:</span> {livro.autor}
                  </p>

                  <p>
                    <span>Valor:</span> R$ {livro.valor}
                  </p>
                </div>
              ) : (
                <div className={styles.livro_info}>
                  <LivroForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    livroData={livro}
                  />
                </div>
              )}
            </div>

          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Livro;
