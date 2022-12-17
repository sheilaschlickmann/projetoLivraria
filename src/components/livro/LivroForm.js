import { useState, useEffect } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import styles from "./LivroForm.module.css";

function LivroForm({ handleSubmit, btnText, livroData }) {
  const [categories, setCategories] = useState([]);
  const [livro, setLivro] = useState(livroData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    // console.log(livro);
    handleSubmit(livro);
  };

  function handleChange(e) {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setLivro({
      ...livro,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do livro"
        name="name"
        placeholder="Insira o nome do Livro"
        handleOnChange={handleChange}
        value={livro.name ? livro.name : ""}
      />

      <Input
        type="text"
        text="Nome do Autor"
        name="autor"
        placeholder="Insira o nome do Autor"
        handleOnChange={handleChange}
        value={livro.autor ? livro.autor : ""}
      />

      <Input
        type="number"
        text="Valor"
        name="valor"
        placeholder="Insira o valor do Livro"
        handleOnChange={handleChange}
        value={livro.valor ? livro.valor : ""}
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={livro.category ? livro.category.id : ""}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default LivroForm;
