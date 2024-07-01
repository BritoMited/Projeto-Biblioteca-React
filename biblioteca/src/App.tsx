import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import ListarLivro from "./components/Livro/ListarLivro";
import ListarUsuario from "./components/Usuario/ListarUsuario";
import CadastrarUsuario from "./components/Usuario/CadastrarUsuario";
import AtualizarUsuario from "./components/Usuario/AtualizarUsuario";
import AtualizarLivro from "./components/Livro/AtualizarLivro";
import CadastrarEmprestimo from "./components/Emprestimo/CadastrarEmprestimo";
import ListarEmprestimo from "./components/Emprestimo/ListarEmprestimo";
import CadastrarLivro from "./components/Livro/CadastrarLivro";



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
                Cadastrar Usuário
              </Link>
            </li>
            <li>
              <Link to={"/pages/usuario/listar"}>
                Listar Usuário
              </Link>
            </li>
            <li>
              <Link to={"/pages/livro/listar"}>
                Listar Livro
              </Link>
            </li>
            <li>
              <Link to={"/pages/livro/cadastrar"}>
                Cadastrar Livro
              </Link>
            </li>
            <li>
              <Link to={"/pages/emprestimo/listar"}>
                Emprestimo Listar
              </Link>
            </li>
          </ul>
      </nav>
        <Routes>
          <Route path="/" element={<ListarLivro />} />
          <Route path="/pages/usuario/cadastrar" element={<CadastrarUsuario />} />
          <Route path="/pages/usuario/alterar/:id" element={<AtualizarUsuario />} />
          <Route path="/pages/usuario/listar" element={<ListarUsuario />} />

          <Route path="/pages/livro/listar" element={<ListarLivro />} />
          <Route path="/pages/livro/atualizar/:id" element={<AtualizarLivro />} />
          <Route path="/pages/livro/cadastrar" element={<CadastrarLivro />} />

          <Route path="/pages/emprestimo/cadastrar/:id" element={<CadastrarEmprestimo />} />
          <Route path="/pages/emprestimo/listar" element={<ListarEmprestimo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
