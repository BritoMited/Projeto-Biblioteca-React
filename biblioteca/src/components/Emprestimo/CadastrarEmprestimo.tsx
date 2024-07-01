import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CadastrarEmprestimo() {
  const { id } = useParams<{ id: string }>(); // ID do livro
  const [idUsuario, setIdUsuario] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleEmprestimo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Converte idUsuario para inteiro antes de enviar a requisição
    const empModel = {
      idUsuario: idUsuario ? parseInt(idUsuario) : undefined, // Converte para número inteiro
    };

    fetch(`http://localhost:5290/Biblioteca/emprestimo/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empModel),
    })
      .then((resposta) => {
        if (resposta.ok) {
          console.log("Empréstimo cadastrado com sucesso.");
          navigate("/pages/emprestimo/listar");
        } else {
          resposta.json().then((data) => console.error("Erro ao cadastrar empréstimo:", data));
        }
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar empréstimo:", erro);
      });
  };

  return (
    <div>
      <h1>Cadastrar Empréstimo para o Livro ID: {id}</h1>
      <form onSubmit={handleEmprestimo}>
        <label>ID do Usuário:</label>
        <input
          type="text"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
          placeholder="Digite o ID do usuário"
          required
        />
        <br />
        <button type="submit">Cadastrar Empréstimo</button>
      </form>
    </div>
  );
}

export default CadastrarEmprestimo;
