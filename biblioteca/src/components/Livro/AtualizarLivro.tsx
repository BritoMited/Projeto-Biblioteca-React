import React, { useEffect, useState } from "react";
import { Livro } from "../../models/Livro";
import { useNavigate, useParams } from "react-router-dom";

function AtualizarLivro() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o parâmetro de rota `id`
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5290/Biblioteca/livro/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((livro: Livro) => {
          setTitulo(livro.titulo);
          setAutor(livro.autor);
          setEditora(livro.editora);
          setCategoria(livro.categoria);
        })
        .catch((erro) => {
          console.error("Erro ao buscar livro:", erro);
        });
    }
  }, [id]);

  function alterarLivro(e: any) {
    e.preventDefault();

    const livroAtualizado: Livro = {
      id: id as string,
      titulo: titulo,
      autor: autor,
      editora: editora,
      categoria: categoria,
    };

    fetch(`http://localhost:5290/Biblioteca/livro/atualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livroAtualizado),
    })
      .then((resposta) => resposta.json())
      .then((livro: Livro) => {
        console.log("Livro alterado com sucesso:", livro);
        navigate("/pages/livro/listar");
      })
      .catch((erro) => {
        console.error("Erro ao alterar livro:", erro);
      });
  }

  return (
    <div>
      <center>
      <h1>Alterar Livro</h1>
      <form onSubmit={alterarLivro}>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título"
          required
          />
        <br />
        <label>Autor:</label>
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Digite o autor"
          required
          />
        <br />
        <label>Editora:</label>
        <input
          type="text"
          value={editora}
          onChange={(e) => setEditora(e.target.value)}
          placeholder="Digite a editora"
          required
        />
        <br />
        <label>Categoria:</label>
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Digite a categoria"
          required
          />
        <br />
        <button type="submit">Alterar</button>
      </form>
</center>
    </div>
  );
}

export default AtualizarLivro;
