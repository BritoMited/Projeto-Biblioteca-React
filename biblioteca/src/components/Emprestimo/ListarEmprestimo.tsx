import React, { useEffect, useState } from "react";
import { Emprestimo } from "../../models/Emprestimo";
import { Link } from "react-router-dom";

function ListarEmprestimo() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);

  useEffect(() => {
    carregarEmprestimos();
  }, []);

  function carregarEmprestimos() {
    fetch("http://localhost:5290/Biblioteca/emprestimo/listar")
      .then((resposta) => resposta.json())
      .then((emprestimos: Emprestimo[]) => {
        console.table(emprestimos);
        setEmprestimos(emprestimos);
      });
  }

  function deletarEmprestimo(id?: string, usuarioId?: string) {
    // Prepara o corpo da requisição com o ID do usuário
    const empModel = {
      idUsuario: usuarioId ? parseInt(usuarioId) : undefined,
    };

    fetch(`http://localhost:5290/Biblioteca/devolucao/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empModel),
    })
      .then((resposta) => {
        if (resposta.ok) {
          setEmprestimos(emprestimos.filter((emprestimo) => emprestimo.id !== id));
          console.log(`Empréstimo ${id} deletado com sucesso.`);
        } else {
          resposta.json().then((data) => console.error("Erro ao deletar empréstimo:", data));
        }
      })
      .catch((erro) => {
        console.error("Erro ao deletar empréstimo:", erro);
      });
  }

  return (
    <div>
      <center>
      <h1>Listagem de Empréstimos</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Empréstimo ID</th>
            <th>Usuário ID</th>
            <th>Livro ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo) => (
            <tr key={emprestimo.id}>
              <td>{emprestimo.id}</td>
              <td>{emprestimo.usuarioId}</td>
              <td>{emprestimo.livroId}</td>
              <td>
                <button onClick={() => deletarEmprestimo(emprestimo.id, emprestimo.usuarioId)}>
                  Devolver
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

export default ListarEmprestimo;
