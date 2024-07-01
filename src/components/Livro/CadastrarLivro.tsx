import React, { useEffect, useState } from "react";
import { Livro } from "../../models/Livro";

function CadastrarLivro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    fetch("http://localhost:5225/api/categoria/listar")
      .then((resposta) => resposta.json())
      .then((data) => {
        console.table(data);
        setCategoria(data[0].nome);
      })
      .catch((erro) => {
        console.error("Erro ao carregar categorias:", erro);
 
      });
  }

  function cadastrarLivro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const novoLivro: Livro = {

      titulo: titulo,
      autor: autor,
      editora: editora,
      categoria: categoria,
    };

    fetch("http://localhost:5290/Biblioteca/livro/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoLivro),
    })
      .then((resposta) => resposta.json())
      .then((livro: Livro) => {
        console.log("Livro cadastrado com sucesso:", livro);
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar livro:", erro);
  
      });
  }

  return (
    <div>
      <h1>Cadastrar Livro</h1>
      <form onSubmit={cadastrarLivro}>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarLivro;
