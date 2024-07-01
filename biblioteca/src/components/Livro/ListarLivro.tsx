import React, { useEffect, useState } from "react";
import { Livro } from "../../models/Livro";
import { Link } from "react-router-dom";

function ListarLivro() {
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    carregarLivros();
  }, []);

  function carregarLivros() {
    fetch("http://localhost:5290/Biblioteca/livro/listar")
      .then((resposta) => resposta.json())
      .then((livros: Livro[]) => {
        console.table(livros);
        setLivros(livros);
      });
  }

  function deletarLivro(id?: string) {
    fetch(`http://localhost:5290/Biblioteca/livro/deletar/${id}`, {
      method: "DELETE",
    })
      .then((resposta) => {
        if (resposta.ok) {
          setLivros(livros.filter((livro) => livro.id !== id));
          console.log(`Livro ${id} deletado com sucesso.`);
        } else {
          console.error("Erro ao deletar livro");
        }
      })
      .catch((erro) => {
        console.error("Erro ao deletar livro:", erro);
      });
  }

  return (
    <div>
      <center>
      <h1>Listagem de Livros</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Livro ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.editora}</td>
              <td>{livro.categoria}</td>
              <td>
                <button onClick={() => deletarLivro(livro.id)}>
                  Deletar
                </button>
                <button className="atualizar">
                <Link to={`/pages/livro/atualizar/${livro.id}`}>
                  Alterar
                </Link>    
                </button>
                <button className="emprestimo">
                <Link to={`/pages/emprestimo/cadastrar/${livro.id}`}>
                  Emprestimo
                </Link>    
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </div>
  );
}

export default ListarLivro;
