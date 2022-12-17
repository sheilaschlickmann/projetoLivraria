import styles from "./Home.module.css";
import savings from "../../img/biblioteca.png";
import LinkButton from "../layout/LinkButton";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Livraria Book House
      </h1>
      <LinkButton to="novolivro" text="Cadastrar Livro" />
      <img src={savings} alt="Book" />
    </section>
  );
}

export default Home;
