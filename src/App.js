import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import NovoLivro from "./components/pages/NovoLivro";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Livros from "./components/pages/Livros";
import Livro from "./components/pages/Livro";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Container customClass="min-height">
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/livros">
            <Livros />
          </Route>

          <Route path="/novolivro">
            <NovoLivro />
          </Route>

          <Route path="/livros/:id">
            <Livro />
          </Route>
        </Container>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
