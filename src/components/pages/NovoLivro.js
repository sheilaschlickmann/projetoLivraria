import { useHistory } from "react-router-dom";
import LivroForm from "../livro/LivroForm";

import styles from "../livro/LivroForm.module.css";

function NovoLivro() {
  const history = useHistory();

  function createPost(livro) {
    livro.valor = 0;

    fetch("http://localhost:5000/livros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
      .then((resp) => resp.json())
      .then((data) => {
        history.push("/livros", { message: "Livro cadastrado com sucesso!" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.novolivro_container}>
      <h1>Cadastrar Livro</h1>
      <LivroForm handleSubmit={createPost} btnText="Cadastrar livro" />
    </div>
  );
}

export default NovoLivro;
