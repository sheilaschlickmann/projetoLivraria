import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Message from "../layout/Message";
import LivroCard from "../livro/LivroCard";
import Loading from "../layout/Loading";

import styles from "./Livros.module.css";

function Livros() {
  const [livros, setLivros] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [LivroMessage, setLivroMessage] = useState("");

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/livros", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setLivros(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  function removeLivro(id) {
    fetch(`http://localhost:5000/livros/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setLivros(livros.filter((livro) => livro.id !== id));
        setLivroMessage("Livro removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.livro_container}>
      <div className={styles.title_container}>
        <h1>Meus Livros</h1>
        <LinkButton to="/novoLivro" text="Cadastrar Livro" />
      </div>

      {message && <Message msg={message} type="success" />}
      {LivroMessage && <Message msg={LivroMessage} type="success" />}

      <Container customClass="start">
        {livros.length > 0 &&
          livros.map((livro) => (
            <LivroCard
              id={livro.id}
              name={livro.name}
              autor={livro.autor}
              valor={livro.valor}
              category={livro.category.name}
              key={livro.id}
              handleRemove={removeLivro}
            />
          ))}

        {!removeLoading && <Loading />}

        {removeLoading && livros.length === 0 && (
          <p>Não há Livros cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Livros;
