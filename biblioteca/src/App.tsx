import ListarLivro from "./components/Livro/ListarLivro";
import ListarUsuario from "./components/Usuario/ListarUsuario";
import CadastrarUsuario from "./components/Usuario/CadastrarUsuario";
import CadastrarLivro from "./components/Livro/CadastrarLivro";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import AtualizarUsuario from "./components/Usuario/AtualizarUsuario";
import AtualizarLivro from "./components/Livro/AtualizarLivro";


function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/pages/usuario/cadastrar"}>
                Cadastrar Usuario{" "}
              </Link>
            </li>
            <li>
              <Link to={"/pages/usuario/listar"}>
                Listar Usuario{" "}
              </Link>
            </li>
            <li>
              <Link to={"/pages/livro/listar"}>
              Listar Livro{" "}
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListarLivro />} />
          <Route
            path="/pages/usuario/cadastrar"
            element={<CadastrarUsuario />}
          />
          <Route
            path="/pages/usuario/alterar/:id"
            element={<AtualizarUsuario />}
          />
          <Route
            path="/pages/usuario/listar"
            element={<ListarUsuario />}
          />


          <Route
            path="/pages/livro/listar"
            element={<ListarLivro />}
          />
          <Route
            path="/pages/livro/atualizar/:id"
            element={<AtualizarLivro />}
          />

        </Routes>
        <footer>
          <p>o clã miteds esteve aqui</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">

//       <h1>USUARIOS</h1>
//       <ListarUsuario/>
//       <CadastrarUsuario/>


//       <h1>LIVROS</h1>
//       <ListarLivro/>
//       <CadastrarLivro/>
//       {/* <AtualizarLivro/> */}
      
//     </div>
//   );
// }

export default App;
